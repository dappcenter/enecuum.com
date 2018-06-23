const axios = require('axios');

const apiUrl = 'https://api.enecuum.com/v1';

function checkAuth(client, {cookies}) {
  axios.request({
    url: apiUrl + '/lk',
    method: 'get',
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Cookie: cookies ? cookies : ''
    },
  }).then((res) => {
    if (res.data.ok) {
      client.emit('checked', {status: res.data.ok, message: res.data.success, code: res.data.code});
    } else {
      client.emit('checked', 401);
    }
  })
}

module.exports = function () {
  const server = require('http').createServer(this.nuxt.renderer.app);
  const io = require('socket.io')(server, {path: '/socket'});
  this.nuxt.listen = (port, host) => new Promise((resolve) => server.listen(port || 80, host || '0.0.0.0', resolve));
  this.nuxt.plugin('close', () => new Promise((resolve) => server.close(resolve)));
  this.addVendor('socket.io-client');
  io.on('connection', (client) => {
    checkAuth(client, {cookies: client.handshake.headers.cookie})
  });
}
