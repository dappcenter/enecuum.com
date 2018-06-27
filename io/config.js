let config = {
  apiUrl: 'https://api.enecuum.com/v1',
  provider: {
    abi: require('./contract.json'),
    url: process.env.dev ? 'wss://ropsten.infura.io/ws' : 'https://mainnet.infura.io/mXPO7EiOcm7mDvnXffB9',
    contract: "0xdd44072854e3a17435e4688e672d7f18f65e7d0c"
  }
}
module.exports = config;
