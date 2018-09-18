const request = require(require.resolve('request'));
const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const FacebookStrategy = require(require.resolve('passport-facebook')).Strategy;

const facebookV = '3.1';
const facebookGraph = 'https://graph.facebook.com/v' + facebookV + '/';

let keywords = ['Enecuum', 'ENQ'];

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    profileFields: ['id', 'displayName', 'email', 'likes'],
    callbackURL: "http://localhost:8081/oauth/facebook/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    let feed = await getFeed(profile, accessToken);
    let friends = await getFriends(profile, accessToken);
    io.emit(friends);
    checkTerms(feed.data, friends.summary.total_count, profile);
    cb('<script>window.close();</script>');
    /*    request.get(facebookGraph + 'me/feed?format=json&access_token=' + accessToken, (err, res) => {
          let feeds = JSON.parse(res.body);
          checkTerms(feeds.data, profile);
          cb('<script>window.close();</script>');
        });*/
  }
));

function getFeed(profile, accessToken) {
  return new Promise(resolve => {
    request.get(facebookGraph + 'me/feed?format=json&access_token=' + accessToken, (err, res) => {
      if (!err) {
        resolve(JSON.parse(res.body));
      }
    });
  });
}

function getFriends(profile, accessToken) {
  return new Promise(resolve => {
    request.get(facebookGraph + 'me/friends?format=json&access_token=' + accessToken, (err, res) => {
      console.log(err, res.body);
      if (!err) {
        resolve(JSON.parse(res.body));
      }
    });
  });
}

function checkTerms(data, totalFriends, profile) {
  let info = {
    isPosted: false,
    isReposted: false,
    isFriends: false,
  };
  console.log(data);
  data.forEach(item => {
/*    if (item.id === '1168739663278027_531648226987177') {
      info.isReposted = true;
    }*/
    if (item.message) {
      keywords.forEach(word => {
        if (item.message.toLowerCase().search(word.toLowerCase()) > -1) {
          info.isPosted = true;
        }
      });
    }
  });
  if (totalFriends > 300) {
    info.isFriends = true;
  }
  io.emit('facebook', profile);
  io.emit('facebook', info);
  io.emit('facebook', data);
}

app.get('/oauth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_posts', 'groups_access_member_info', 'user_likes', 'user_friends']}));
app.get('/oauth/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', function (body) {
    res.status(200).send(body);
  })(req, res, next);
});
