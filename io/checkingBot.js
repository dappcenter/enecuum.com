const Web3 = require(require.resolve('web3'));
const BigNumber = require(require.resolve('bignumber.js'));
const HDWalletProvider = require("truffle-hdwallet-provider");
const mnemonic = process.env.MNEMONIC_SEED;

const {ManagerWorker} = require('./contractProvider');
const config = require('./../config/config');

const {getUsers} = require('./informer');

let icoAddress = process.env.dev ? config.web3.ropsten.contracts.ico.address[0] : config.web3.mainnet.contracts.ico.address[0];
let abi = process.env.dev ? config.web3.ropsten.contracts.ico.abi : config.web3.mainnet.contracts.ico.abi;
let currentProvider = process.env.dev ? config.web3.ropsten.node : config.web3.mainnet.node;
const provider = new HDWalletProvider(mnemonic, currentProvider + process.env.infura);

console.log(currentProvider);

const managerWorker = new ManagerWorker({provider: provider, abi: abi, contractAddress: icoAddress});

module.exports = {
  managerWorker
};
