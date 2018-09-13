const request = require(require.resolve('request'));
const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const FacebookStrategy = require(require.resolve('passport-facebook')).Strategy;

const facebookV = '3.1';
const facebookGraph = 'https://graph.facebook.com/v' + facebookV + '/';

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    profileFields: ['id', 'displayName', 'email', 'likes'],
    callbackURL: "http://localhost:8081/oauth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    request.get(facebookGraph + 'me/feed?format=json&access_token=' + accessToken, (err, res) => {
      let data = {
        id: profile.id,
        email: profile.emails,
        feed: res.body
      };
      console.log('emit from facebook!', data);
      io.emit('facebook', data);
      cb('<script>window.close();</script>');
    });
  }
));

app.get('/oauth/facebook', passport.authenticate('facebook', {scope: ['email', 'user_posts', 'groups_access_member_info', 'user_likes']}));
app.get('/oauth/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', function (body) {
    res.status(200).send(body);
  })(req, res, next);
});
