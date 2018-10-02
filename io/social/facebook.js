const request = require(require.resolve('request'));
const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const FacebookStrategy = require(require.resolve('passport-facebook')).Strategy;

const facebookV = '3.1';
const facebookGraph = 'https://graph.facebook.com/v' + facebookV + '/';

const keywords = ['Enecuum', 'ENQ'];
const companyname = 'Enecuum ENQ Blockchain of tomorrow';
const minfriends = 300;

const GODMODE = true;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    profileFields: ['id', 'displayName', 'email', 'likes'],
    callbackURL: process.env.DOMAIN_URL + "/oauth/facebook/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    let allInfo = await getAll(profile, accessToken);
    checkTerms(allInfo.feed.data, allInfo.friends.summary, profile);
    cb('<script>window.close();</script>');
  }
));

function getAll(profile, accessToken) {
  return new Promise(resolve => {
    request.get(facebookGraph + 'me?fields=feed{subscribed,name,full_picture,from,message,target,type},friends&format=json&access_token=' + accessToken, (err, res) => {
      if (!err) {
        resolve(JSON.parse(res.body));
      }
    });
  });
}

io.on('connect', (client) => {
  function checkTerms(data, totalFriends, profile) {
    let info = {
      isPosted: false,
      isReposted: false,
      isFriends: false,
      isSubscribed: false,
    };
    data.forEach(item => {
      if (item.name === companyname) {
        info.isReposted = true;
        if (item.subscribed = true) {
          item.isSubscribed = true;
        }
      }
      if (item.message) {
        keywords.forEach(word => {
          if (item.message.toLowerCase().search(word.toLowerCase()) > -1) {
            info.isPosted = true;
          }
        });
      }
    });
    if (totalFriends.total_count > minfriends) {
      info.isFriends = true;
    }

    if (GODMODE) {
      client.emit('facebook', GODMODE);
      return false;
    }

    client.emit('facebook', {info: info, totalFriends: totalFriends.total_count});
    if (info.isPosted && info.isReposted && info.isFriends && info.isSubscribed) {
      client.emit('facebook', true);
    } else {
      client.emit('facebook', false);
    }
  }
});

app.get('/oauth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_posts', 'groups_access_member_info', 'user_likes', 'user_friends']}));
app.get('/oauth/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', function (body) {
    res.status(200).send(body);
  })(req, res, next);
});
