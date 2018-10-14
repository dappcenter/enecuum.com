const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const TwitterStrategy = require(require.resolve('passport-twitter')).Strategy;
const expressSession = require('express-session');
const Twitter = require('twitter');


const keywords = ['#Enecuum', '#ENQ', '#mobilemining'];
const retweetedCompany = 'ENQ_enecuum';
const mincount = 2;
const mindays = 7;
const maxFriendsCount = 50;

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_SECRET_TOKEN
});

app.use(expressSession({
  secret: 'superpuperubersecret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());
io.on('connect', (ioclient) => {
  passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: 'https://' + process.env.AIRDROP_HOST + "/oauth/twitter/callback"
    },
    async (accessToken, refreshToken, profile, cb) => {
      let tweets = await getTweets(profile.id);
      let isFollow = await isFollowedTo(profile.id);
      ioclient.emit('test', 'before checking terms');
      checkTerms(tweets, profile, isFollow, ioclient);
      ioclient.emit('test', 'after checking terms');
      cb(null);
      ioclient.emit('test', 'after ps callback');
    }
  ));

  function getTweets(id) {
    return new Promise(resolve => {
      client.get('statuses/user_timeline', (error, tweets, response) => {
        if (!error) {
          resolve(tweets);
        } else {
          //io.emit('twitter', error);
        }
      });
    });
  }

  function isFollowedTo(id) {
    return new Promise(resolve => {
      client.get('friendships/show', {
        target_id: id
      }, (error, body, response) => {
        if (!error) {
          resolve(body.relationship.source.followed_by);
        } else {
          //io.emit('twitter', error);
        }
      });
    });
  }

  function checkTerms(data, profile, isfollow, socket) {
    console.log('checking terms: ');
    socket.emit('test', 'checking terms');
    let count = {
      tweets: 0,
      retweets: 0
    };
    let info = {
      hashtag: false,
      followers: false,
      isFollow: isfollow
    };

    if (profile._json.followers_count > maxFriendsCount) {
      info.followers = true;
    }
    data.forEach(item => {
      keywords.forEach(word => {
        if (item.retweeted && item.retweeted_status.user.screen_name.toLowerCase() === retweetedCompany.toLowerCase()) {
          /*          let tweetDate = new Date(item.created_at);
                    let retweetDate = new Date(item.retweeted_status.created_at);
                    let diffDate = Math.ceil(Math.abs(tweetDate.getTime() - retweetDate.getTime()) / (1000 * 3600 * 24));*/
          //if (diffDate < mindays) {
          count.tweets++;
          if (count.tweets >= mincount) {
            info.hashtag = true;
          }
          //}
        }
        if (!item.retweeted && item.text.toLowerCase().search(word.toLowerCase()) > -1) {
          count.tweets++;
          if (count.tweets >= mincount) {
            info.hashtag = true;
          }
        }
      });
    });
    socket.emit('test', 'testall');
    if (info.hashtag && info.followers && info.isFollow) {
      console.log('send good twitter', info);
      socket.emit('test', 'testgood');
      socket.emit('twitter', true);
    } else {
      console.log('send bad twitter', info);
      socket.emit('test', 'testbad');
      socket.emit('twitter', false);
    }
  }

  setTimeout(() => {
    ioclient.emit('test', 'test');
  }, 5000);

  app.get('/oauth/twitter', passport.authenticate('twitter'));
  app.get('/oauth/twitter/callback',
    passport.authenticate('twitter', {failureRedirect: '/oauth/close'}),
    function (req, res) {
      res.redirect('/');
    });
});
