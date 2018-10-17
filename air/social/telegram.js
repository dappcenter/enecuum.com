const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const {createHash, createHmac} = require('crypto');
const userUpdate = require('../userUpdate');

module.exports = (app, socket) => {
  if (process.env.TELEGRAM_APIKEY) {
    const token = process.env.TELEGRAM_APIKEY;
    const bot = new TelegramBot(token, {
      polling: true
    });

    function checkSignature(token, {hash, ...data}) {
      const secret = createHash('sha256').update(token).digest();
      const checkString = Object.keys(data).sort().map(k => `${k}=${data[k]}`).join('\n');
      const hmac = createHmac('sha256', secret).update(checkString).digest('hex');
      return hmac === hash;
    }

    app.post('/oauth/telegram', (req, res, next) => {
      console.log('userid: ', req.body);
      let user = req.body.user;
      if (checkSignature(token, user)) {
        return bot.getChatMember(process.env.TELEGRAM_GROUPID, user.id).catch(error => {
          console.log('getChatMember error');
          socket.send(JSON.stringify({ok: false, userId: req.session.user}));
          res.send({ok: false});
        }).then(user => {
          console.log('getChatMember success: ', user, user.user.username);
          let provider = 'telegram';
          userUpdate({t: provider, session: req.session.user, ok: true, tl: user.user.username}).then(user => {
            socket.send(JSON.stringify({
              ok: user.ok,
              userId: req.session.user,
              message: user.message,
              provider: provider
            }));
            res.send({ok: false});
          });
        });
      } else {
        socket.send(JSON.stringify({ok: false, userId: req.session.user}));
        res.send({ok: false});
      }
    });
  }
};
