const Web3 = require(require.resolve('web3'));
const request = require(require.resolve('request'));
const BigNumber = require(require.resolve('bignumber.js'));
const EventEmitter = require('events').EventEmitter;

const config = require('./../config/config');

const {flusher} = require('./flusher');

const {sendPureLog, sendLog, getFirstBlock, setFirstBlock} = require('./informer');
const {io} = require('./server');

const TOKEN_PRICE = 0.04;

let currentContractAddress = process.env.dev ? config.web3.ropsten.contracts.wallet.address : config.web3.mainnet.contracts.wallet.address;
let currentContractAbi = process.env.dev ? config.web3.ropsten.contracts.wallet.abi : config.web3.mainnet.contracts.wallet.abi;
let currentProvider = process.env.dev ? config.web3.ropsten.node : config.web3.mainnet.node;

let web3 = new Web3(currentProvider + process.env.infura);
let rate = 0;

let interval = setInterval(() => {
  request('https://api.coinmarketcap.com/v2/ticker/1027/', (err, res) => {
    try {
      rate = BigNumber(JSON.parse(res.body).data.quotes.USD.price * 1000).toNumber();
    } catch (err) {
    }
  });
}, 5000);

let pendingDelay = 20000;
let promisedBlocks = [];
let lastTransaction = {};
let tmpLastTransaction = {};
let lastBlock = {};
let firstBlock = null;
let contractsTransactionArray = [];
let contractAddress = currentContractAddress;

let transaction = new EventEmitter();

async function getTransactionsByAccount(to, startBlockNumber, endBlockNumber) {
  contractsTransactionArray = [];
  if (endBlockNumber == null) {
    endBlockNumber = await web3.eth.getBlockNumber();
    console.log("Using endBlockNumber: " + endBlockNumber);
  }
  if (startBlockNumber == null) {
    startBlockNumber = endBlockNumber - 1;
    console.log("Using startBlockNumber: " + startBlockNumber);
  }
  let currentBlock = startBlockNumber;
  endBlockNumber = (endBlockNumber - startBlockNumber >= 100) ? (parseInt(startBlockNumber) + 100) : endBlockNumber;
  console.log("Searching for transactions to account \"" + to + "\" within blocks " + startBlockNumber + " and " + endBlockNumber);
  for (currentBlock = startBlockNumber; currentBlock < endBlockNumber; currentBlock++) {
    web3.eth.getBlock(currentBlock, true, (error, block) => {
      if (error) console.log(error);
      if (block != null && block.transactions != null) {
        block.transactions.forEach((e) => {
          if (e.to && (to.toLowerCase() == e.to.toLowerCase())) {
            let contractsTransaction = {
              block: currentBlock,
              tx: e.hash,
              from: e.from,
              to: e.to,
              amount: e.value,
            };
            console.log('log from getBlock', currentBlock, startBlockNumber, endBlockNumber);
            contractsTransactionArray.push(contractsTransaction);
          }
        });
      }
    });
  }
  setTimeout(() => {
    console.log('transaction emit', contractsTransactionArray.length, currentBlock);
    transaction.emit('send', contractsTransactionArray, currentBlock);
  }, 10000);
}

transaction.on('send', (arr, currentBlock) => {
  if (arr.length) {
    emitterClient(arr);
    firstBlock = currentBlock;
    flusher(arr, rate, TOKEN_PRICE);
  }
  setFirstBlock(currentBlock);
  getTransactionsByAccount(contractAddress, currentBlock);
});

function emitterClient(contractsTransaction) {
  for (let i = 0; i < contractsTransaction.length; i++) {
    console.log('in emitterClient function', contractsTransaction.length);
    contractsTransaction[i].ether = BigNumber(contractsTransaction[i].amount).dividedBy(BigNumber("1e18")).toNumber();
    contractsTransaction[i].usd = BigNumber(contractsTransaction[i].ether).multipliedBy(rate).dividedBy(1000).toNumber();
    contractsTransaction[i].tokens = BigNumber(contractsTransaction[i].usd).dividedBy(TOKEN_PRICE).toNumber();
    sendLog({
      tx: contractsTransaction[i].tx,
      sender: contractsTransaction[i].from,
      ether: contractsTransaction[i].ether,
      usd: contractsTransaction[i].usd,
      token: contractsTransaction[i].tokens
    });
    io.sockets.emit('depositUpdates', {
      tx: contractsTransaction[i].tx,
      sender: contractsTransaction[i].from,
      ether: contractsTransaction[i].ether,
      usd: contractsTransaction[i].usd,
      amount: contractsTransaction[i].tokens
    });
  }
}

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('sleep');
    }, ms)
  })
}

getFirstBlock().then(res => {
  console.log('first block: ', res);
  try {
    if (res) {
      if (res[0].blockNumber !== 0) {
        firstBlock = res[0].blockNumber;
      }
      getTransactionsByAccount(contractAddress, firstBlock);
    }
  } catch (e) {
    sendPureLog('ERROR DB GET FIRST BLOCK');
  }
});
