const request = require(require.resolve('request'));
const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

let keywords = ['Enecuum', 'ENQ', 'Домохозяйка'];

const Linkedin = require('node-linkedin')(process.env.LINKEDIN_KEY, process.env.LINKEDIN_SECRET, 'http://localhost:8081/oauth/linkedin/callback');
const scope = ['r_emailaddress', 'r_basicprofile', 'rw_company_admin'];

/*let strategy = new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "http://localhost:8081/oauth/linkedin/callback",
    scope: ['r_emailaddress', 'r_basicprofile', 'rw_company_admin'],
    state: true
  },
  (accessToken, refreshToken, profile, cb) => {
    console.log(accessToken, refreshToken, profile);
    io.emit('linkedin', profile);
    cb(null);
    /!*request.get(facebookGraph + 'me/feed?format=json&access_token=' + accessToken, (err, res) => {
      let feeds = JSON.parse(res.body);
      checkTerms(feeds.data, profile);
      cb('<script>window.close();</script>');
    });*!/
  }
);
strategy._oauth2.setAccessTokenName("oauth2_access_token");
passport.use(strategy);*/
function checkTerms(data, profile) {
  let info = {
    isPosted: false,
    isReposted: false
  };
  data.forEach(item => {
    if (item.id === '1168739663278027_531648226987177') {
      info.isReposted = true;
    }
    if (item.message) {
      keywords.forEach(word => {
        if (item.message.toLowerCase().search(word.toLowerCase()) > -1) {
          info.isPosted = true;
        }
      });
    }
  });
  io.emit('linkedin', profile);
  io.emit('linkedin', info);
  io.emit('linkedin', data);
}

app.get('/oauth/linkedin', (req, res) => {
  Linkedin.auth.authorize(res, scope, true);
});

app.get('/oauth/linkedin/callback', (req, res) => {
  Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, (err, results) => {
    if (err) return console.error(err);
    const linkedin = Linkedin.init(results.access_token);
    console.log(linkedin.people.config.accessToken);
    linkedin.people.me((err, res) => {
      if (err) return console.log(err);
      console.log(res);
      return res.redirect('/oauth/close');
    });
  });
});

/*app.get('/oauth/linkedin', passport.authenticate('linkedin'));
app.get('/oauth/linkedin/callback',
  passport.authenticate('linkedin', {failureRedirect: '/oauth/close'}),
  function (req, res) {
    res.redirect('/');
  });*/
