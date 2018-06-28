let config = {
  apiUrl: 'https://api.enecuum.com/v1',
  provider: {
    abi: require('./contract.json'),
    url: process.env.dev ? 'https://ropsten.infura.io/mXPO7EiOcm7mDvnXffB9' : 'https://mainnet.infura.io/mXPO7EiOcm7mDvnXffB9',
    contract: process.env.dev ? '0xdd44072854e3a17435e4688e672d7f18f65e7d0c' : '0xdf26369b419013cba54eb859daff6f8bc167618b'
  }
}
