const app = require(require.resolve('express'))();
const server = require(require.resolve('http')).Server(app);
const checkUserInfo = require('./checkUserInfo');
const bodyParser = require(require.resolve('body-parser'));
const cookieParser = require(require.resolve('cookie-parser'));
const cookieSession = require(require.resolve('cookie-session'));
const zmq = require(require.resolve('zeromq'));
const socket = zmq.socket('pull');
const cookie = require(require.resolve('cookie'));
//const origins = ['*'];

app.use(cookieParser());
app.use(bodyParser.json());

app.disable('x-powered-by');
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", process.env.DOMAIN_URL);
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

socket.connect('tcp://' + process.env.MQ_SERVER);

let connectedClients = [];
socket.on('message', (msg) => {
  try {
    console.log(msg.toString());
    let data = JSON.parse(msg.toString());
    connectedClients.forEach((item, index) => {
      console.log('item: ', item);
      if (item.userId === data.userId) {
        console.log('find: ', item);
        io.to(item.clientId).emit('airdropNotification', {
          ok: data.ok,
          provider: data.provider || '',
          message: data.message || 'All required conditions are not met'
        });
        return false;
      }
    });
  } catch (e) {
    console.log(e);
  }
});
io.on('connection', (client) => {
  client.emit('connectServer', client.id);
  client.on('disconnect', () => {
    console.log('disconnect: ', client.id);
    connectedClients.forEach((item, index) => {
      if (item.clientId === client.id) {
        connectedClients.splice(index, 1);
      }
    });
  });
  client.on('leaveBackoffice', () => {
    try {
      console.log('disconnect: ', client.id);
      connectedClients.forEach((item, index) => {
        if (item.clientId === client.id) {
          connectedClients.splice(index, 1);
        }
      });
    } catch (e) {
    }
  });
  client.on('enterBackoffice', () => {
    console.log('cookie: ', client.request.headers.cookie);
    try {
      let cc = cookie.parse(client.handshake.headers.cookie)['session'];
      if (cc) {
        let parsedCookie = JSON.parse(Buffer.from(cc, 'base64').toString()).user;
        connectedClients.push({
          clientId: client.id,
          userId: parsedCookie
        });
        console.log('connected clients: ', connectedClients.length);
      }
    } catch (e) {
      console.log(e);
    }
  });
  checkUserInfo(client, {cookies: client.handshake.headers.cookie});
});

module.exports = {
  io,
  app,
  server
}
