require('dotenv').config()
const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;

const facebookV = '3.1';
const facebookGraph = 'https://graph.facebook.com/v' + facebookV + '/';

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request);
  Object.setPrototypeOf(res, app.response);
  req.res = res;
  res.req = req;
  next();
});
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    profileFields: ['id', 'displayName', 'email', 'likes'],
    callbackURL: "http://localhost/oauth/facebook/callback"
  },
  (accessToken, refreshToken, profile, cb) => {
    request.get(facebookGraph + 'me/feed?format=json&access_token=' + accessToken, (err, res) => {
      let data = {
        id: profile.id,
        email: profile.emails,
        feed: res.body
      };
      console.log(data);
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

module.exports = app;
