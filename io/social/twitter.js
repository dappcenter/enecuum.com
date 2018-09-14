const request = require(require.resolve('request'));
const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const TwitterStrategy = require(require.resolve('passport-twitter')).Strategy;

/*const facebookV = '3.1';
const facebookGraph = 'https://graph.facebook.com/v' + facebookV + '/';*/

passport.use(new TwitterStrategy({
    clientID: process.env.TWITTER_API_KEY,
    clientSecret: process.env.TWITTER_API_SECRET_KEY,
    callbackURL: "http://localhost:8081/oauth/twitter/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log('emit from twitter!', data);
    io.emit('twitter', data);
    cb('<script>window.close();</script>');
    /*    request.get(facebookGraph + 'me/feed?format=json&access_token=' + accessToken, (err, res) => {
          let data = {
            id: profile.id,
            email: profile.emails,
            feed: res.body
          };
        });*/
  }
));

app.get('/oauth/twitter', passport.authenticate('twitter'));
app.get('/oauth/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', function (body) {
    res.status(200).send(body);
  })(req, res, next);
});
