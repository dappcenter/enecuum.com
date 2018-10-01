const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');
const token = process.env.TELEGRAM_APIKEY;

const bot = new TelegramBot(token, {
  polling: true
});

const {app, io} = require('./../server');

/*bot.on('message', (msg) => {
  let welcome = 'Welcome ';
  console.log('chat id: ', msg.chat.id);
  msg.new_chat_members.forEach((user, index, arr) => {
    welcome += '@' + user.username + ((index === arr.length - 1) ? '' : ', ');
  });
  bot.sendMessage(msg.chat.id, welcome);
});*/

app.post('/oauth/telegram', (req, res, next) => {
  console.log(req.body.id);
  bot.getChatMember(process.env.TELEGRAM_GROUPID, req.body.id).catch(error => {
    res.send({ok: false});
  }).then(user => {
    res.send({ok: true});
  });
});
