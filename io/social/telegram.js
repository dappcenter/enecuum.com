const request = require(require.resolve('request'));
const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const TelegramStrategy = require('passport-telegram-official').Strategy;


passport.use(new TelegramStrategy({
    botToken: BOT_TOKEN
  },
  (profile, cb) => {
    console.log(profile);
  }
));

app.get('/oauth/telegram', passport.authenticate('telegram'));
