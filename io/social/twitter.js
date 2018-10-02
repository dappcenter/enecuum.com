const passport = require(require.resolve('passport'));
const {app, io} = require('./../server');
const TwitterStrategy = require(require.resolve('passport-twitter')).Strategy;
const expressSession = require('express-session');
const Twitter = require('twitter');


const keywords = ['#Enecuum', '#ENQ', '#mobilemining'];
const retweetedCompany = 'ENQ_enecuum';
const mincount = 2;
const mindays = 7;

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

  function checkTerms(data, profile, isfollow) {
    console.log('checking terms: ');
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

    if (profile._json.followers_count > 150) {
      info.followers = true;
    }
    data.forEach(item => {
      keywords.forEach(word => {
        if (item.retweeted && item.retweeted_status.user.screen_name.toLowerCase() === retweetedCompany.toLowerCase()) {
          /*          let tweetDate = new Date(item.created_at);
                    let retweetDate = new Date(item.retweeted_status.created_at);
                    let diffDate = Math.ceil(Math.abs(tweetDate.getTime() - retweetDate.getTime()) / (1000 * 3600 * 24));*/
          //if (diffDate < mindays) {
          count.retweets++;
          if (count.retweets >= mincount) {
            info.retweets = true;
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

    console.log('twitter', info, ioclient);
    if (info.hashtag && info.followers && info.retweets && info.isFollow) {
      ioclient.emit('twitter', true);
    } else {
      ioclient.emit('twitter', false);
    }
  }

  app.get('/oauth/twitter', passport.authenticate('twitter'));
  app.get('/oauth/twitter/callback',
    passport.authenticate('twitter', {failureRedirect: '/oauth/close'}),
    function (req, res) {
      res.redirect('/');
    });
});
