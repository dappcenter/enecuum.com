const app = require(require.resolve('express'))();
const server = require(require.resolve('http')).Server(app);
const checkUserInfo = require('./checkUserInfo');

const startTimestamp = new Date().getTime();
const origins = ['enecuum.com:*'];

const io = require('socket.io')(server, {
  path: '/io',
  serveClient: false,
  pingInterval: 3000,
  pingTimeout: 3000,
  cookie: true
});

io.origins[origins];

io.on('connection', (client) => {
  client.emit('connectServer', startTimestamp);
  checkUserInfo(client, {cookies: client.handshake.headers.cookie});
});

module.exports = {
  io,
  app,
  server
}
