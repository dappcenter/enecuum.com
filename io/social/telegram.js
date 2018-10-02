const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const token = process.env.TELEGRAM_APIKEY;
const {createHash, createHmac} = require('crypto');

const bot = new TelegramBot(token, {
  polling: true
});

const {app, io} = require('./../server');

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
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
      console.log('getChatMember error:');
      res.send({ok: false});
    }).then(user => {
      console.log('getChatMember success: ', user);
      res.send({ok: true});
    });
  } else {
    return res.send({ok: false});
  }
});
