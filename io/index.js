const dev = require(require.resolve('dotenv')).config();
const {app, server} = require('./server');
const request = require('request');
//require('./social/');
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
      managerWorker.addToWhiteList(body.success.wallet).then(res => {
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
            if (data.code !== 401) {
              resp.send({ok: true});
            } else {
              resp.send({ok: false});
            }
          })
        } else {
          resp.send({ok: res.ok});
        }
      });
    }
  });
});

server.listen(8081, '0.0.0.0');

console.log('started');
