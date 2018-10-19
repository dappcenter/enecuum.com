const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const {createHash, createHmac} = require('crypto');

const token = process.env.TELEGRAM_APIKEY;
const bot = new TelegramBot(token, {
  polling: true,
  request: {
    agentClass: Agent,
    agentOptions: {
      socksHost: process.env.TELEGRAM_PROXY_IP,
      socksPort: parseInt('1080'),
      socksUsername: process.env.TELEGRAM_PROXY_LOGIN,
      socksPassword: process.env.TELEGRAM_PROXY_PASS
    }
  }
});

const {app, io} = require('./../server');

/*console.log(process.env.TELEGRAM_GROUPID, process.env.TELEGRAM_MY_ID);
bot.getChatMember(process.env.TELEGRAM_GROUPID, process.env.TELEGRAM_MY_ID).catch(error => {
  console.log('getChatMember error:');
}).then(user => {
  console.log('getChatMember success: ', user.user.username); //user.user.username
  console.log('send ok');
});*/

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
      console.log('getChatMember success: ', user); //user.user.username
      console.log('send ok');
      res.send({ok: true});
    });
  } else {
    return res.send({ok: false});
  }
});
