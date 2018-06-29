const Web3 = require(require.resolve('web3'));
const request = require(require.resolve('request'));
const BigNumber = require(require.resolve('bignumber.js'));

const config = require('./../config/config');

const {flusher} = require('./flusher');
const {sendLog, sendPureLog, getFirstBlock, setFirstBlock} = require('./informer');
const {io} = require('./server');

const TOKEN_PRICE = 0.04;

let currentContractAddress = process.env.dev ? config.web3.ropsten.contracts.token.address : config.web3.mainnet.contracts.token.address;
let currentContractAbi = process.env.dev ? config.web3.ropsten.contracts.token.abi : config.web3.mainnet.contracts.token.abi;
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
let lastTransaction = {};
let tmpLastTransaction = {};
let lastBlock = {};
let firstBlock = 0;
let contractsTransaction = [];
let contractAddress = currentContractAddress;

async function scanBlocks() {
  if (firstBlock == 0) {
    firstBlock = await web3.eth.getBlockNumber();
  }
  console.log('fisrt block:', firstBlock);
  lastBlock = await web3.eth.getBlockNumber();
  console.log('last block:', lastBlock);
  if (lastBlock > firstBlock) {
    let count = lastBlock - firstBlock;
    console.log('number of minings blocks - ' + count);
    for (let i = 0; i <= count; i++) {
      getBlock(lastBlock - i);
    }
    setFirstBlock(lastBlock);
  }
  firstBlock = lastBlock;
}

function getBlock(currentBlock) {
  contractsTransaction = [];
  web3.eth.getBlock(currentBlock, true, (error, block) => {
    try {
      for (let i = 0; i <= block.transactions.length - 1; i++) {
        let scannedBlock = block.transactions[i];
        if (scannedBlock.to && (scannedBlock.to.toUpperCase() === contractAddress.toUpperCase())) {
          contractsTransaction.push({
            block: currentBlock,
            tx: scannedBlock.hash,
            from: scannedBlock.from,
            to: scannedBlock.to,
            amount: scannedBlock.value,
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  });
}


function ethTransactionScanner() {
  scanBlocks();

  setTimeout(() => {
    contractsTransaction.sort((a, b) => {
      return a.block - b.block;
    });
    for (let i = 0; i <= contractsTransaction.length - 1; i++) {
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
      flusher.setQuery({
        sender: contractsTransaction[i].from,
        token: contractsTransaction[i].tokens
      });
    }
    lastTransaction = contractsTransaction[contractsTransaction.length - 1];
    if (pendingDelay == 20000) {
      sendPureLog('Number of new transactions after restart - ' + contractsTransaction.length);
      console.log('First check finish');
      pendingDelay = 5000;
    }
    ethTransactionScanner();
  }, pendingDelay);
}

getFirstBlock().then(res => {
  try {
    if (res) {
      if (res[0].blockNumber == 0) {
        firstBlock = res[0].blockNumber;
      }
      ethTransactionScanner();
    }
  } catch (e) {
    sendPureLog('ERROR DB GET FIRST BLOCK');
  }
});
