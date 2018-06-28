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
  console.log('fisrt block:', firstBlock);
  if (firstBlock == 0) {
    firstBlock = await web3.eth.getBlockNumber();
    console.log('fisrt block:', firstBlock);
  }
  lastBlock = await web3.eth.getBlockNumber();
  if (lastBlock >= firstBlock) {
    let count = lastBlock - firstBlock;
    console.log('number of minings blocks - ' + count);
    for (let i = 0; i <= count; i++) {
      getBlock(lastBlock - i);
    }
  }
  setFirstBlock(lastBlock);
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
    }
    tmpLastTransaction = contractsTransaction[contractsTransaction.length - 1];
    if (tmpLastTransaction && (lastTransaction !== tmpLastTransaction)) {
      console.log(tmpLastTransaction);
      sendLog({
        tx: tmpLastTransaction.tx,
        sender: tmpLastTransaction.from,
        ether: tmpLastTransaction.ether,
        usd: tmpLastTransaction.usd,
        token: tmpLastTransaction.tokens
      });
      io.sockets.emit('depositUpdates', {
        tx: tmpLastTransaction.tx,
        sender: tmpLastTransaction.from,
        ether: tmpLastTransaction.ether,
        usd: tmpLastTransaction.usd,
        amount: tmpLastTransaction.tokens
      });
      flusher.setQuery({
        sender: tmpLastTransaction.from,
        token: tmpLastTransaction.tokens
      });
    }
    lastTransaction = contractsTransaction[contractsTransaction.length - 1];
    if (pendingDelay !== 20000) {
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
})
//ethTransactionScanner();

/*contract.methods.transactions(contractAddress.toLowerCase()).call().then(res=>{
  console.log(res);
});

contract.methods.getTransactionIds('0xe6402f1782d6229506d43fe2dae00b8c33503b4d'.toLowerCase(), '0xDD44072854e3a17435e4688e672d7f18f65e7D0C'.toLowerCase(), false, false).call().then(res=>{
  console.log(res);
});*/


//scanBlockRange(firstBlockNumber, undefined);


//sendPureLog('socket-server started');


//subsctibtionContract();
