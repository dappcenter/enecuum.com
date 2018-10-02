const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const token = process.env.TELEGRAM_APIKEY;

const bot = new TelegramBot(token, {
  polling: true
});

const {app, io} = require('./../server');

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log(msg);
});

app.post('/oauth/telegram', (req, res, next) => {
  console.log(req.body);
  bot.getChatMember(process.env.TELEGRAM_GROUPID, req.body.id).catch(error => {
    console.log('getChatMember error: ', error);
    res.send({ok: false});
  }).then(user => {
    console.log('getChatMember success: ', user);
    res.send({ok: true});
  });
});
