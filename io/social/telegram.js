const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const token = process.env.TELEGRAM_APIKEY;
const crypto = require('crypto');

const bot = new TelegramBot(token, {
  polling: true
});

const {app, io} = require('./../server');

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
});

app.post('/oauth/telegram', (req, res, next) => {
  console.log('userid: ', req.body, req.body.id);
  let user = req.body.user;
  let hash = user.hash;
  const secret_key = crypto.createHash('sha256').update(token);
  const hmac = crypto.createHmac('sha256', secret_key).update(`auth_dateid=${user.auth_date}\nfirst_name=${user.first_name}\nid=${user.id}\nusername=${user.username}`);

  console.log('hash: ', hash);
  console.log('hmac: ', hmac);

  if (hash !== hmac) {
    return res.send({ok: false});
  }
  return bot.getChatMember(process.env.TELEGRAM_GROUPID, user.id).catch(error => {
    console.log('getChatMember error:');
    res.send({ok: false});
  }).then(user => {
    console.log('getChatMember success: ', user);
    res.send({ok: true});
  });
});
