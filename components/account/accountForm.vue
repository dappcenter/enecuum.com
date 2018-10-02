<template>
  <el-row class="flex-center account__form-wrapper">
    <el-col :xs="22" :sm="12" :md="14" :xl="10">
      <el-row :gutter="30" class="flex-center flex-wrap">
        <el-form :model="accountForm" :rules="rulesAccountForm" ref="accountForm"
                 class="account__form flex-center">
          <el-form-item label="YOU SEND (ETH)" prop="invest">
            <el-input-number controls-position="right" :min="0" :step="0.001" v-model="accountForm.invest"
                             placeholder="0000000 ETH"
                             @keyup.native="ethInput"></el-input-number>
          </el-form-item>
          <el-form-item label="YOU ~ GET (ENQ)" prop="get">
            <el-input-number :controls="false" :min="0" :step="0.001" v-model="accountForm.get"
                             placeholder="0000000 ENQ"
                             @keyup.native="enqInput"></el-input-number>
          </el-form-item>
          <el-form-item>
            <el-popover
              placement="right"
              trigger="hover"
              :content="web3info.text"
              v-if="!web3info.loaded">
              <el-button slot="reference" type="primary"><i class="el-icon-refresh"
                                                            style="animation: rotating 2s linear infinite;animation-direction: reverse;"></i>
              </el-button>
            </el-popover>
            <el-button v-else type="primary" @click="buy"
                       :disabled="!verified ? 'disabled' : null">Buy tokens
            </el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
  import axios from 'axios';
  import bn from 'bignumber.js';
  import socket from '~/plugins/socket.io.js'

  const tokenPrice = 0.04;

  export default {
    name: "account-form",
    props: {
      verified: Boolean,
      userInfo: Object,
      web3info: Object,
      token: Object,
      ico: Object,
      contractInfo: Object
    },
    data() {
      return {
        contractInstance: {},
        price: 0,
        accountForm: {
          invest: 1,
          get: null
        },
        rulesAccountForm: {
          invest: [{
            required: true,
            message: 'This field is required'
          }],
          get: [{
            required: true,
            message: 'This field is required'
          }]
        }
      }
    },
    methods: {
      buy() {
        if (!this.web3info.loaded) return false;
        let form = this.$refs.accountForm;
        form.validate((valid) => {
          if (valid) {
            this.sendTransaction();
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      },
      sendTransaction() {
        console.log(this.contractInfo.tokenAddress);
        web3.eth.getGasPrice((err, res) => {
          let gasPrice = res.c[0];//bn(res.c[0]).multipliedBy("10e8").toNumber();
          web3.eth.sendTransaction({
            from: web3.eth.coinbase,
            to: this.contractInfo.icoAddress,
            value: web3.toWei(bn(this.accountForm.invest).toFixed(10), "ether"),
            gas: 1000000,
            gasPrice: gasPrice
          }, (err, res) => {
            socket.emit('check');
            if (err) {
              this.$notify({
                message: 'It is sad, but transaction was rejected',
                type: 'error',
                position: 'bottom-left',
                showClose: false
              });
            } else {
              this.$notify({
                dangerouslyUseHTMLString: true,
                message: `Waiting for transaction to be mined (you can see <a href="https://${this.userInfo.currentNetwork ? this.userInfo.currentNetwork : ''}etherscan.io/tx/${res}" target="_blank">tx details</a>)`,
                type: 'warning',
                position: 'bottom-left',
                showClose: false,
                duration: 10000
              });
            }
          });
        });
      },
      ethInput(e) {
        let input = bn(e.srcElement.value).multipliedBy(1e18).toString();
        console.log(input);
        if (input) {
          this.ico.getTokenAmount(input, (err, res) => {
            if (!err) {
              console.log(res);
              this.accountForm.get = bn(res).dividedBy(1e10).toString();
            }
          });
        }
      },
      enqInput(e) {
        let input = bn(e.srcElement.value).toString();
        if (input) {
          this.ico.getWeiAmount(parseInt(input), (err, res) => {
            if (!err) {
              console.log(res);
              this.accountForm.invest = bn(res).dividedBy(1e10).toString();
            }
          });
        }
      }
    },
    mounted() {
      this.ico.getFiatPrice.call((err, res) => {
        if (!err) {
          console.log('fiat price:', bn(res).dividedBy(1e3).toString());
        }
      });
      this.ico.getUserCap(this.userInfo.wallet, (err, res) => {
        if (!err) {
          console.log('user cap: ', bn(res).dividedBy(1e3).toString());
        }
      })
    }
  }
</script>
