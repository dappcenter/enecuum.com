const dev = require(require.resolve('dotenv')).config();
const {app, server, io} = require('./server');
const request = require('request');
require('./social/');
const mail = require('./../mail/mailer.js');
const {managerWorker} = require('./checkingBot');

const apiUrl = 'https://api.enecuum.com/v1';

async function whitelisting({cookie, userdata, data}) {
  let id = data.queryTime;
  if (userdata.code === 202) {
    let gasPrice = await managerWorker.getGasPrice();
    let whitelisted = await managerWorker.addToWhiteList(userdata.success.wallet, gasPrice);
    if (!whitelisted.ok) {
      //io emit exit
      io.emit('wl', {ok: false, id: id});
      return false;
    }
    let usercapped = await managerWorker.setUserCap(userdata.success.wallet, gasPrice);
    if (!usercapped.ok) {
      //io emit exit
      io.emit('wl', {ok: false, id: id});
      return false;
    }
    request.post({
      url: apiUrl + '/wallet',
      method: 'post',
      form: data,
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        Cookie: cookie
      }
    }, (err, res, body) => {
      let data = JSON.parse(body);
      console.log('before send mail: ', userdata.success);
      mail.send('wl', {EMAIL: userdata.success.email, FIRST_NAME: userdata.success.name});
      console.log(data);
      if (data.code !== 401) {
        io.emit('wl', {ok: true, id: id});
      } else {
        io.emit('wl', {ok: false, id: id});
      }
    })
  }
}

app.post((process.env.dev ? '' : '/api') + '/backoffice/whitelist', (req, resp) => {
  let maindata = req.body;
  return request({
      url: apiUrl + '/lk',
      method: 'get',
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        Cookie: req.headers.cookie
      },
    }, (err, res, body) => {
      if (!err) {
        let userdata = JSON.parse(body);
        whitelisting({cookie: req.headers.cookie, data: maindata, userdata: userdata})
      }
      resp.send({ok: true});
    }
  );
});

server.listen(8081, '0.0.0.0');

console.log('started');
