<template>
  <section class="container account">
    <h1 class="text-center page-title">Personal account</h1>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="10" :md="12" :xl="10">
        <el-row :gutter="30" class="flex-center flex-wrap flex-column">
          <h3 class="text-center title-semibold text-uppercase mb13">Your balance</h3>
          <h4 class="text-center title-bold title-middle mb13">ENQ
            <ICountUp
              :startVal="0"
              :endVal="userInfo.balance"
              :decimals="10"
              :duration="4"
              :options="easingOptions"
              ref="counter"
            />
          </h4>
          <el-alert
            class="enq-alert"
            :title="'Be aware! Contributing is available only for the legally approved whitelisted wallets. Using exchanges is prohibited! You can contribute only directly from your own wallet (it must not be exchange address): '+userInfo.wallet"
            type="info"
            :closable="false">
          </el-alert>
          <el-alert
            title="Maximum amount of contribution is 2 million dollars, all transactions that exceed the limits will be reverted"
            type="info"
            class="mb13 mt13"
            v-if="verified"
            center
            :closable="false">
          </el-alert>
          <el-alert
            :title="'Your current coinbase account is set to ' + userInfo.currentWallet + ', but it must be equal to ' + userInfo.wallet"
            v-if="web3info.text==='Waiting for changing your coinbase account'"
            type="error"
            class="mb40 mt13"
            center
            :closable="false">
          </el-alert>
          <h4 class="mt40 text-center title-middle">
            Address for Contribute (ETH)
          </h4>
          <h4 class="text-center title-bold title-middle flex-center flex-middle addr-wrapper">
            <span
              class="addr">{{contractInfo.currentIcoAddress}}</span>
            <img src="/img/icons/copy.svg"
                 class="ml13 account-copy"
                 alt="" @click="copy"></h4>
          <div class="text-center">
            Please set gas limit to 1.000.000 or above
          </div>
          <el-row type="flex" justify="center" class="mb40 mt20">
            <el-button-group>
              <el-button type="default" size="small" @click.prevent="openVideo('6Gf_kRE4MJU', 'How MetaMask works')">How
                MetaMask works <i class="fa fa-play-circle-o"></i>
              </el-button>
              <el-button type="default" size="small" @click.prevent="openVideo('bRM4OBqsc2I', 'How to buy tokens')">How
                to buy tokens <i class="fa fa-play-circle-o"></i>
              </el-button>
            </el-button-group>
          </el-row>
          <el-dialog
            :title="videoTitle"
            :visible.sync="videoVisible"
            width="560px"
            :before-close="handleVideoVisible"
            class="videounborder">
            <div style="height: 315px">
              <iframe width="560" height="315" :src="'https://www.youtube.com/embed/'+videoUrl+'?autoplay=1'"
                      frameborder="0"
                      allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>
          </el-dialog>
          <el-alert
            title="Your wallet is not whitelisted yet, please wait"
            type="warning"
            center
            class="mt13 mb40"
            :closable="false"
            v-if="whitelisted && !verified"></el-alert>
        </el-row>
      </el-col>
    </el-row>
    <accountForm v-if="web3info.loaded" :web3info="web3info" :contractInfo="contractInfo" :ico="icoContract"
                 :token="tokenContract"
                 :verified="verified" :userInfo="userInfo"></accountForm>
    <el-row class="flex-center mb40" v-else>
      <el-col :xs="22" :sm="10" :md="12" :xl="10">
        <el-row :gutter="30" class="flex-center flex-wrap flex-column">
          <el-alert
            :title="web3info.text"
            type="warning"
            center
            :closable="false"></el-alert>
          <div v-if="web3info.text==='We recommend to use MetaMask or Mist Browser'" class="mt20 mb13 flex flex-around">
            <a href="https://metamask.io/" target="_blank">Metamask</a><a
            href="https://github.com/ethereum/mist/releases" target="_blank">Mist
            Browser</a></div>
        </el-row>
      </el-col>
    </el-row>

    <tokenVesting v-if="web3info.loaded" @changeStage="selectStage" :icoAddressList="icoAddressList"
                  :contractInfo="contractInfo"
                  :icoAddressProp="contractInfo.icoAddress"
                  :ico="icoContract" :token="tokenContract"
                  :userInfo="userInfo"
                  :verified="verified"
                  :vesting="vesting"
                  :changeVesting="changeVesting"
                  @openVideo="openVideo" @setVestingBalance="setVestingBalance"></tokenVesting>
    <el-row class="flex-center mb40">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <p class="text-center">If you have any more questions, please email our support at <br> <a
          href="mailto:support@enecuum.com">support@enecuum.com</a></p>
        <h3 class="text-center title-under mb13"><a href="/docs/Enecuum_TokenSale_Terms_and_Conditions.pdf?v=1.4"
                                                    target="_blank">Token Sale Terms and Conditions</a></h3>

      </el-col>
    </el-row>
  </section>
</template>

<script>
  import accountForm from '@/components/account/accountForm';
  import tokenVesting from '@/components/account/tokenVesting';
  import socket from '~/plugins/socket.io.js';
  import ICountUp from 'vue-countup-v2';
  import bn from 'bignumber.js';

  export default {
    name: "faq",
    middleware: 'auth',
    data() {
      return {
        interval: null,
        changeVesting: false,
        icoAddressList: [],
        videoVisible: false,
        videoUrl: '',
        videoTitle: '',
        icoContract: {},
        tokenContract: {},
        web3info: {
          loaded: false,
          text: 'We recommend to use MetaMask or Mist Browser to use extended buyer form'
        },
        vesting: false,
        verified: false,
        whitelisted: false,
        contractInfo: {},
        userInfo: {
          wallet: '',
          currentWallet: '',
          plainBalance: 0,
          balance: 0,
          vestingBalance: 0,
          currentNetwork: ''
        },
        easingOptions: {
          useEasing: true,
          useGrouping: true,
          separator: '',
          decimal: '.',
        }
      }
    },
    components: {
      accountForm,
      tokenVesting,
      ICountUp
    },
    methods: {
      copy() {
        let inp = document.createElement('input');
        inp.value = this.contractInfo.icoAddress;
        inp.classList.add('forselect');
        inp.style.position = 'fixed';
        inp.style.top = '-100%';
        inp.style.left = '-100%';
        document.body.appendChild(inp);
        let addr = document.querySelector('input.forselect');
        if (document.createRange) {
          addr.select();
          document.execCommand('copy');
          this.$notify({
            type: 'info',
            message: 'Wallet address was copied to your clipboard',
            position: 'bottom-left',
          });
        }
        addr.remove();
      },
      openVideo(url, title) {
        this.videoUrl = url;
        this.videoTitle = title;
        this.videoVisible = true;
      },
      handleVideoVisible() {
        this.videoVisible = false;
        this.videoUrl = '';
      },
      hasVestingWallet(addr = this.contractInfo.icoAddress) {
        this.icoContract = web3.eth.contract(this.contractInfo.icoAbi).at(addr);
        this.icoContract.hasVestingWallet(this.userInfo.wallet, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!res) {
            setTimeout(() => {
              console.log('has vestingWallet settimeout');
              this.hasVestingWallet();
            }, 5000);
          }
          if (!err) {
            this.changeVesting = !this.changeVesting;
            this.vesting = res;
          }
          if (res) {
          }
        });
      },
      getTokenBalance() {
        this.tokenContract.balanceOf(this.userInfo.wallet, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!err) {
            this.userInfo.balance = bn(res).dividedBy(1e10).plus(bn(this.userInfo.vestingBalance)).toNumber() || bn(res).dividedBy(1e10).toNumber();
            this.$refs.counter.update(this.userInfo.balance);
          }
        });
      },
      setVestingBalance(val = 0) {
        this.userInfo.vestingBalance = val;
        //this.userInfo.balance += bn(bn(this.userInfo.balance).plus(bn(val)).toNumber());
        //this.$refs.counter.update(this.userInfo.balance);
      },
      selectStage(addr) {
        console.log('SELECT STAGE: ', addr);
        this.contractInfo.icoAddress = addr;
        this.icoContract = web3.eth.contract(this.contractInfo.icoAbi).at(addr);
        this.icoContract.hasVestingWallet(this.userInfo.wallet, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!err) {
            this.vesting = res;
          }
        });
      },
      selectNetwork(flush) {
        if (flush) clearInterval(this.interval);
        web3.eth.getCoinbase((error, result) => {
          if (error) {
            this.web3info.text = 'Wa can\'t detect your coinbase account';
            this.whitelisted = false;
            setTimeout(() => {
              this.detectNetwork();
            }, 10000);
          } else {
            this.userInfo.currentWallet = result;
            this.$store.commit('SET_WEB3WALLET', result);
            if (this.userInfo.wallet.toLocaleLowerCase() !== result.toLocaleLowerCase()) {
              this.web3info.text = 'Waiting for changing your coinbase account';
              this.whitelisted = false;
              setTimeout(() => {
                this.detectNetwork();
              }, 10000);
            } else {
              this.icoContract = web3.eth.contract(this.contractInfo.icoAbi).at(this.contractInfo.currentIcoAddress);
              this.tokenContract = web3.eth.contract(this.contractInfo.tokenAbi).at(this.contractInfo.tokenAddress);
              this.web3info.loaded = true;
              this.icoContract.hasRole(this.userInfo.wallet, 'whitelist', (err, res) => {
                if (!err) {
                  this.whitelisted = res;
                  this.verified = res;
                  if (res) {
                    socket.on('depositUpdates', (info) => {
                      let me = (this.$store.state.web3wallet.toLocaleLowerCase() === info.sender.toLocaleLowerCase()) ? true : false;
                      me ? (this.userInfo.balance = bn(bn(this.userInfo.balance).plus(bn(info.amount))).toNumber()) : null;
                    });
                  }
                }
              });
              setTimeout(() => {
                this.hasVestingWallet();
                this.getTokenBalance();
              }, 1000);
              this.interval = setInterval(() => {
                this.getTokenBalance();
              }, 9500);
            }
          }
        });
      },
      detectNetwork() {
        let address = '';
        web3.version.getNetwork((err, netId) => {
          switch (netId) {
            case "1":
              this.web3info.text = 'Connecting to MainNet';
              this.contractInfo.icoAddress = require('./../../config/config').web3.mainnet.contracts.ico.address[0];
              this.contractInfo.currentIcoAddress = require('./../../config/config').web3.mainnet.contracts.ico.address[0];
              this.icoAddressList = require('./../../config/config').web3.mainnet.contracts.ico.address;
              this.contractInfo.icoAbi = require('./../../config/config').web3.mainnet.contracts.ico.abi;
              this.contractInfo.tokenAddress = require('./../../config/config').web3.mainnet.contracts.token.address;
              this.contractInfo.tokenAbi = require('./../../config/config').web3.mainnet.contracts.token.abi;
              this.contractInfo.vestingAbi = require('./../../config/config').web3.mainnet.contracts.vesting.abi;
              break;
            case "2":
              this.web3info.text = 'You\'re using deprecated Morden test network to use extended buyer form';
              setTimeout(() => {
                this.detectNetwork();
              }, 15000);
              break;
            case "3":
              this.web3info.text = 'Connecting to Ropsten';
              this.userInfo.currentNetwork = 'ropsten.';
              this.contractInfo.icoAddress = require('./../../config/config').web3.ropsten.contracts.ico.address[0];
              this.contractInfo.currentIcoAddress = require('./../../config/config').web3.mainnet.contracts.ico.address[0];
              this.icoAddressList = require('./../../config/config').web3.ropsten.contracts.ico.address;
              this.contractInfo.icoAbi = require('./../../config/config').web3.ropsten.contracts.ico.abi;
              this.contractInfo.tokenAddress = require('./../../config/config').web3.ropsten.contracts.token.address;
              this.contractInfo.tokenAbi = require('./../../config/config').web3.ropsten.contracts.token.abi;
              this.contractInfo.vestingAbi = require('./../../config/config').web3.ropsten.contracts.vesting.abi;
              break;
            default:
              this.web3info.text = 'Connect to MainNet or Ropsten to use extended buyer form';
              setTimeout(() => {
                this.detectNetwork();
              }, 15000);
          }
          if (web3.eth.accounts.length < 1) {
            this.web3info.text = 'Please unlock your MetaMask account to use extended buyer form';
            setTimeout(() => {
              this.detectNetwork();
            }, 10000);
            return false;
          }
          if (this.contractInfo.currentIcoAddress && this.contractInfo.tokenAddress) setTimeout(() => {
            this.selectNetwork();
          }, 4000);
        });
      }
    },
    mounted() {
      this.userInfo = this.$store.state.kyc.message;
      this.contractInfo.icoAddress = require('./../../config/config').web3.mainnet.contracts.ico.address[0];
      this.icoAddressList = require('./../../config/config').web3.mainnet.contracts.ico.address;
    },
    created() {
      if (this.$store.state.kyc.code === 200) {
        setTimeout(() => {
          if (typeof web3 !== 'undefined') {
            this.web3info.text = 'Detecting Network';
            this.detectNetwork();
          }
        }, 1000);
      }
    }
  }
</script>
