const dev = require(require.resolve('dotenv')).config();
const {app, server, io} = require('./server');
const request = require('request');
//require('./social/');
const mail = require('./../mail/mailer.js');
const {managerWorker} = require('./checkingBot');

const apiUrl = 'https://api.enecuum.com/v1';

async function whitelisting({cookie, userdata, data}) {
  let id = data.queryTime;
  if (userdata.code === 202) {
    let gasPrice = await managerWorker.getGasPrice();
    console.log(gasPrice);
    let whitelisted = await managerWorker.addToWhiteList(userdata.success.wallet, gasPrice);
    console.log('whitelisted: ', userdata.success.wallet, managerWorker.getCap(), whitelisted);
    if (!whitelisted.ok) {
      //io emit exit
      io.emit('wl', {ok: false, id: id});
      return false;
    }
    let usercapped = await managerWorker.setUserCap(userdata.success.wallet, gasPrice);
    console.log('usercapped: ', usercapped.ok);
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
    /*    managerWorker.web3.eth.getGasPrice((err, res) => {
          if (!err) {
            let gasPrice = parseInt(res * 1.2);
            console.log(gasPrice);
            managerWorker.addToWhiteList(body.success.wallet, gasPrice).then(res => {
              console.log(res.ok);
              if (res.ok) {
                console.log(body.success.wallet, managerWorker.getCap());
                setTimeout(() => {
                  managerWorker.setUserCap(body.success.wallet, gasPrice).then(res => {
                    console.log(res.ok);
                    if (res.ok) {
                      request.post({
                        url: apiUrl + '/wallet',
                        method: 'post',
                        form: data,
                        withCredentials: true,
                        headers: {
                          'X-Requested-With': 'XMLHttpRequest',
                          'Content-Type': 'application/json',
                          Cookie: req.headers.cookie
                        }
                      }, (err, res, body) => {
                        let data = JSON.parse(body);
                        mail.send('wl', {EMAIL: userdata.success.email, FIRST_NAME: userdata.success.name});
                        if (data.code !== 401) {
                          resp.send({ok: true});
                        } else {
                          resp.send({ok: false});
                        }
                      })
                    }
                  });
                }, 60 * 1000);
              } else {
                resp.send({ok: res.ok});
              }
            });
          } else {
            resp.send({ok: false});
          }
        });*/
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
    }
  );
});

server.listen(8081, '0.0.0.0');

console.log('started');
