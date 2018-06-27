const Web3 = require(require.resolve('web3'));
const request = require(require.resolve('request'));
const BigNumber = require(require.resolve('bignumber.js'));

const config = require('./config');

const {flusher} = require('./flusher');
const {sendLog} = require('./informer');
const {io} = require('./server');

const TOKEN_PRICE = 0.04;

let provider = new Web3.providers.WebsocketProvider(config.provider.url);
let web3 = new Web3(provider);
let contract = new web3.eth.Contract(config.provider.abi, config.provider.contract);

provider.on('error', e => console.log('WS Error', e));
provider.on('end', e => {
  console.log('WS closed');
  console.log('Attempting to reconnect...');
  provider = new Web3.providers.WebsocketProvider(config.provider.url);
  contract = new web3.eth.Contract(config.provider.abi, config.provider.contract);
  provider.on('connect', function () {
    console.log('WSS Reconnected');
  });
  web3.setProvider(provider);
});


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

contract.events.Deposit({}, (err, res) => {
  console.log('deposit event from smartcontract');
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
    let ether = amount.dividedBy(BigNumber("1e18")).toNumber();
    let usd = BigNumber(ether).multipliedBy(rate).dividedBy(1000).toFixed(3);
    let token = BigNumber(usd).dividedBy(TOKEN_PRICE);
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
