const userUpdate = require('../userUpdate');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const expressSession = require('express-session');
const Twitter = require('twitter');

module.exports = (app, socket) => {

  const keywords = ['#Enecuum', '#ENQ', '#mobilemining'];
  const retweetedCompany = 'ENQ_enecuum';
  const mincount = 2;
  const mindays = 7;
  const maxFriendsCount = 50;

  if (process.env.TWITTER_API_KEY) {
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
        callbackURL: 'https://' + process.env.AIRDROP_HOST + "/oauth/twitter/callback"
      },
      async (accessToken, refreshToken, profile, cb) => {
        console.log('twitter start');
        let tweets = await getTweets(profile.id);
        let isFollow = await isFollowedTo(profile.id);
        let results = checkTerms(tweets, profile, isFollow);
        cb(null, results);
      }
    ));
    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    function getTweets(id) {
      return new Promise(resolve => {
        client.get('statuses/user_timeline', (error, tweets, response) => {
          if (!error) {
            resolve(tweets);
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
          }
        });
      });
    }

    const checkTerms = (data, profile, isfollow) => {
      console.log('start checking twitter terms');
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

      if (info.hashtag && info.followers && info.isFollow) {
        console.log('twitter finished all conditions', info);
        return {ko: true, tw: profile.username};
      } else {
        console.log('twitter finished not all conditions', info);
        return {ko: false, tw: profile.username};
      }
    };
    app.get('/oauth/twitter', passport.authenticate('twitter'));
    app.get('/oauth/twitter/callback', passport.authenticate('twitter', {failureRedirect: '/oauth/close'}),
      (req, res) => {
        try {
          if (req.user.ko) {
            let provider = 'twitter';
            userUpdate({t: provider, session: req.session.user, ...req.user}).then(user => {
              socket.send(JSON.stringify({
                ok: user.ok,
                userId: req.session.user,
                message: user.message,
                provider: provider
              }));
            });
          } else {
            socket.send(JSON.stringify({ok: false, userId: req.session.user}));
          }
        } catch (e) {
          console.log('twitter callback send error: ', e);
        }
        res.redirect('/oauth/close');
      });
  }
};
