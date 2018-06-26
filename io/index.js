const dev = require(require.resolve('dotenv')).config();
const checkUserInfo = require('./checkUserInfo');
const request = require(require.resolve('request'));
const contract = require('./contractProvider').contract;
const BigNumber = require(require.resolve('bignumber.js'));
const mysql = require(require.resolve('mysql'));
const app = require(require.resolve('express'))();
const server = require(require.resolve('http')).Server(app);
const TOKEN_PRICE = 0.04;
const apiUrl = 'https://api.enecuum.com/v1';
const origins = ['http://enecuum.com', 'https://enecuum.com'];

const io = require('socket.io')(server, {
  path: '/provider',
  serveClient: false,
  pingInterval: 1000,
  pingTimeout: 1000,
  cookie: true
});

io.origins((origin, callback) => {
  if (origins.indexOf(origin) > -1) {
    callback(null, true);
  }
  return callback('origin not allowed', false);
});

io.on('connection', (client) => {
  checkUserInfo(client, {cookies: client.handshake.headers.cookie});
});
server.listen(8081, '127.0.0.1');


let pool = mysql.createPool({
  connectionLimit: 20,
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_name
});

function query({sender, token}) {
  pool.getConnection((err, connection) => {
    if (err) {
      console.log('error:', err.stack);
      return;
    }
    let initialAmountQuery = "SELECT u.balance FROM users AS u JOIN kyc AS k ON u.id = k.user_id LEFT JOIN kyc_individual AS i ON (k.accountType = 1 AND u.id = i.user_id) LEFT JOIN kyc_company AS c ON (k.accountType = 2 AND u.id = c.user_id) WHERE k.accountType IS NOT NULL AND (EXISTS(SELECT i.user_id FROM kyc_individual AS i WHERE i.user_id = u.id) OR EXISTS(SELECT c.user_id FROM kyc_company WHERE c.user_id = u.id)) AND k.status = 4 AND (i.ethWalletNumber = '" + sender + "' OR c.ethWalletNumber = '" + sender + "') ORDER BY u.id ASC LIMIT 1";
    //connection.connect();
    connection.query(initialAmountQuery, (error, res) => {
      try {
        if (res) {
          let initialAmount = parseInt(res[0].balance);
          console.log(BigNumber(initialAmount).toNumber(), BigNumber(token).shiftedBy(10).toNumber(), BigNumber(initialAmount).plus(BigNumber(token).shiftedBy(10)).toNumber());
          let query = "UPDATE users AS u JOIN kyc AS k ON u.id = k.user_id LEFT JOIN kyc_individual AS i ON (k.accountType = 1 AND u.id = i.user_id) LEFT JOIN kyc_company AS c ON (k.accountType = 2 AND u.id = c.user_id) SET u.balance = '" + (BigNumber(initialAmount).isNaN() ? BigNumber(token).shiftedBy(10) : BigNumber(initialAmount).plus(BigNumber(token).shiftedBy(10))) + "' WHERE k.accountType IS NOT NULL AND (EXISTS(SELECT i.user_id FROM kyc_individual AS i WHERE i.user_id = u.id) OR EXISTS(SELECT c.user_id FROM kyc_company WHERE c.user_id = u.id)) AND k.status = 4 AND (i.ethWalletNumber = '" + sender + "' OR c.ethWalletNumber = '" + sender + "') ORDER BY u.id ASC LIMIT 1";
          connection.query(query, (err) => {
            console.log('success query');
            if (err) console.log(err);
          })
        }
      } catch (e) {

      }
    });
    console.log('connected to pool');
  });
}


let rate = 0;

let interval = setInterval(() => {
  request('https://api.coinmarketcap.com/v2/ticker/1027/', (err, res) => {
    try {
      rate = BigNumber(JSON.parse(res.body).data.quotes.USD.price * 1000).toNumber();
    } catch (err) {
      console.log(err);
    }
  });
}, 3000);

function sendLog({tx, sender, ether, usd, token}) {
  request(apiUrl + "/log?err=New Tx&url=https://" + (process.env.dev ? "ropsten." : "") + "etherscan.io/tx/" + tx + "&line=]&ua=data: " + ether + " ether from " + sender + " (" + usd + " usd / " + BigNumber(token).toFixed(10) + " enq)", (err, res) => {
    if (err) console.log(err);
    //console.log(res);
  });
}

function Flusher() {
  this.pending = [];
  this.locked = false;
  this.setQuery = ({sender, token}) => {
    this.pending.push({sender, token});
    if (!this.locked) {
      this.locked = true;
      query(this.pending[0]);
      this.pending.splice(0, 1);
      console.log('outted');
    } else {
      console.log('waiting...');
      setTimeout(() => {
        console.log('waiting end');
        this.setQuery(this.pending[0]);
        if (this.locked) this.locked = false
      }, 5000);
    }
  }
}

let flusher = new Flusher();

contract.events.Deposit({}, (err, res) => {
  console.log('deposit event');
  if (err) {
    console.log(err)
  }
  if (res) {
    console.log(res)
  }
  if (!err) {
    let tx = res.transactionHash;
    let sender = res.returnValues.sender;
    let amount = BigNumber(res.returnValues.value);
    let ether = amount.dividedBy(BigNumber("1e17")).toNumber();
    let usd = BigNumber(ether).multipliedBy(rate).dividedBy(1000).toFixed(3);
    let token = BigNumber(usd).dividedBy(TOKEN_PRICE).dividedBy(10).toNumber();
    console.log('ether', ether);
    console.log('usd', usd);
    console.log('token', token);
    sendLog({tx, sender, ether, usd, token});

    let data = {sender, token};

    flusher.setQuery(data);
    io.sockets.emit('depositUpdates', {
      tx: tx,
      sender: sender,
      amount: token,
      ether: ether,
      usd: usd
    });
  }
});

console.log('started');


app.get('/ping', (req, res) => {
  res.send("i'm live man");
});
