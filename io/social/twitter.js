const request = require(require.resolve('request'));
const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const TwitterStrategy = require(require.resolve('passport-twitter')).Strategy;
const expressSession = require('express-session');
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_SECRET_TOKEN
});
console.log(client);

/*const facebookV = '3.1';
const facebookGraph = 'https://graph.facebook.com/v' + facebookV + '/';*/
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
  (accessToken, refreshToken, profile, cb) => {
    console.log('emit from twitter!', profile);
    io.emit('twitter', profile);
    client.get('statuses/user_timeline', (error, tweets, response) => {
      if (!error) {
        io.emit('twitter', tweets);
      } else {
        io.emit('twitter', error);
      }
    });
  }
));

app.get('/oauth/twitter', passport.authenticate('twitter'));
app.get('/oauth/twitter/callback',
  passport.authenticate('twitter', {failureRedirect: '/login'}),
  function (req, res) {
    res.redirect('/');
  });
