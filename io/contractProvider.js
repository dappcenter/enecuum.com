const Web3 = require(require.resolve('web3'));
const config = require('./config');

let provider = new Web3(new Web3.providers.WebsocketProvider(config.provider.url));
const contract = new provider.eth.Contract(config.provider.abi, config.provider.contract);

module.exports = {
  contract
};
