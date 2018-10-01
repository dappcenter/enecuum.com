const app = require(require.resolve('express'))();
const server = require(require.resolve('http')).Server(app);
const checkUserInfo = require('./checkUserInfo');
const bodyParser = require(require.resolve('body-parser'));
const cookieParser = require(require.resolve('cookie-parser'));

const startTimestamp = new Date().getTime();
//const origins = ['*'];

app.use(cookieParser());
app.use(bodyParser.json());

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/oauth/close', (req, res) => {
  res.send('<script>window.close();</script>')
});
const io = require('socket.io')(server, {
  path: '/io',
  serveClient: false,
  pingInterval: 3000,
  pingTimeout: 3000,
  cookie: true
});

//io.origins[origins];

io.on('connection', (client) => {
  client.emit('connectServer', startTimestamp);
  checkUserInfo(client, {cookies: client.handshake.headers.cookie});
});

module.exports = {
  io,
  app,
  server
}
