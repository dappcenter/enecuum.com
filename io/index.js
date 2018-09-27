const dev = require(require.resolve('dotenv')).config();
const {app, server} = require('./server');
const request = require('request');
//require('./social/');
const mail = require('./../mail/mailer.js');
const {managerWorker} = require('./checkingBot');

const apiUrl = 'https://api.enecuum.com/v1';

app.post('/backoffice/whitelist', (req, resp) => {
  let data = req.body;
  return request({
    url: apiUrl + '/lk',
    method: 'get',
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Cookie: req.headers.cookie
    },
  }, (err, res, body) => {
    body = JSON.parse(body);
    if (body.code === 202) {
      managerWorker.web3.eth.getGasPrice((err, res) => {
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
                      request({
                        url: apiUrl + '/lk',
                        method: 'get',
                        withCredentials: true,
                        headers: {
                          'X-Requested-With': 'XMLHttpRequest',
                          Cookie: req.headers.cookie
                        },
                      }, (err, res, body) => {
                        let data = JSON.parse(body);
                        mail.send('wl', {EMAIL: data.success.email, FIRST_NAME: data.success.name});
                      });
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
      });
    }
  });
});

server.listen(8081, '0.0.0.0');

console.log('started');
