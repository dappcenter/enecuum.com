const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const TwitterStrategy = require(require.resolve('passport-twitter')).Strategy;
const expressSession = require('express-session');
const Twitter = require('twitter');


let keywords = ['#Enecuum', '#ENQ', '#mobilemining'];

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
passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRET_KEY,
    callbackURL: "http://enecuum.com:8081/oauth/twitter/callback"
  },
  async (accessToken, refreshToken, profile, cb) => {
    let tweets = await getTweets(profile.id);
    let isFollow = await isFollowedTo(profile.id);
    checkTerms(tweets, profile, isFollow);
    cb(null);
  }
));

function getTweets(id) {
  return new Promise(resolve => {
    client.get('statuses/user_timeline', (error, tweets, response) => {
      if (!error) {
        resolve(tweets);
      } else {
        io.emit('twitter', error);
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
        io.emit('twitter', error);
      }
    });
  });
}


function checkTerms(data, profile, isfollow) {
  let count = {
    tweets: 0,
    retweets: 0
  };
  let info = {
    hashtag: false,
    followers: false,
    retweets: false,
    isFollow: isfollow
  };
  if (profile._json.followers_count > 250) {
    info.followers = true;
  }
  data.forEach(item => {
    keywords.forEach(word => {
      if (item.retweeted) {
        if (item.retweeted_status.text.toLowerCase().search(word.toLowerCase()) > -1) {
          count.retweets++;
          if (count.retweets >= 2) {
            info.retweets = true;
          }
        }
      }
      if (item.text.toLowerCase().search(word.toLowerCase()) > -1) {
        count.tweets++;
        if (count.tweets >= 2) {
          info.hashtag = true;
        }
      }
    });
  });
  io.emit('twitter', info);
}

app.get('/oauth/twitter', passport.authenticate('twitter'));
app.get('/oauth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/oauth/close'}),
  function (req, res) {
    res.redirect('/');
  });
