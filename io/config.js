let config = {
    provider: {
        abi: require('./contract.json'),
        url: process.env.dev ? 'wss://ropsten.infura.io/ws' : 'https://mainnet.infura.io/mXPO7EiOcm7mDvnXffB9',
        contract: process.env.dev ? "0xdd44072854e3a17435e4688e672d7f18f65e7d0c" : ""
    }
}
module.exports = config;
