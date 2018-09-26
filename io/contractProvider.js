const Web3 = require(require.resolve('web3'));

class ManagerWorker {
  /**
   *
   * @param provider
   * @param abi
   * @param contractAddress
   */
  constructor({provider, abi, contractAddress}) {
    let web3 = new Web3(provider);
    this.contract = new web3.eth.Contract(abi, contractAddress);
    this.managerAddress = this.contract.currentProvider.getAddress(0);
    this.USERCAP = 1000000000;
  }

  /**
   *
   * @param usercap = Number
   */
  setUserCap(usercap) {
    this.USERCAP = usercap;
  }

  /**
   *
   * @param wallet = String
   * @returns {Promise<any>} = data:Object
   */
  addToWhiteList(wallet) {
    console.log('sending from: ', this.managerAddress);
    return new Promise(resolve => {
      this.contract.methods.managerAddAddressToWhitelist(wallet).send({
        from: this.managerAddress
      }).then(res => {
        resolve({ok: true, status: res.status, data: res});
      }).catch(e => {
        resolve({ok: false, status: e.status, data: e});
      });
    })
  }

  /**
   *
   * @param wallets = Array
   * @returns {Promise<any>} = data:Object
   */
  addBulkToWhitelist(wallets) {
    return new Promise(resolve => {
      this.contract.methods.managerAddAddressesToWhitelist(wallets).send({from: this.managerAddress}).then(res => {
        resolve({ok: true, status: res.status, data: res});
      }).catch(e => {
        resolve({ok: false, status: e.status, data: e});
      });
    })
  }

  /**
   *
   * @param wallet = String
   * @returns {Promise<any>} = data:Object
   */
  setUserCap(wallet) {
    return new Promise(resolve => {
      this.contract.methods.managerSetUserCap(wallet, this.USERCAP).call().then((res) => {
        resolve({ok: true, status: res.status, data: res});
      }).catch(e => {
        resolve({ok: true, status: e.status, data: e});
      });
    });
  }

  /**
   *
   * @param wallets = Array
   * @returns {Promise<any>} = data:Object
   */
  setGroupCap(wallets) {
    return new Promise(resolve => {
      this.contract.methods.managerSetUserCap(wallets, this.USERCAP).call().then((res) => {
        resolve({ok: true, status: res.status, data: res});
      }).catch(e => {
        resolve({ok: true, status: e.status, data: e});
      });
    });
  }

  /**
   *
   * @param wallet = String
   * @returns {Promise<any>} = data:Boolean
   */
  checkWhiteList(wallet) {
    return new Promise(resolve => {
      this.contract.methods.whitelist(wallet).call().then(res => {
        resolve({ok: true, data: res});
      }).catch(e => {
        resolve({ok: true, data: e});
      });
    })
  }
}

module.exports = {
  ManagerWorker
};
