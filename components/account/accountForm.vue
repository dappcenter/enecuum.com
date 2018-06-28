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
  import config from '@/io/config.js';
  import socket from '~/plugins/socket.io.js'

  const tokenPrice = 0.04;

  export default {
    name: "account-form",
    props: {
      verified: Boolean,
      userInfo: Object,
      web3info: Object
    },
    data() {
      return {
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
        web3.eth.getGasPrice((err, res) => {
          let gasPrice = bn("8e9").toNumber();//res.c[0];
          web3.eth.sendTransaction({
            from: web3.eth.coinbase,
            to: config.provider.contract,
            value: web3.toWei(bn(this.accountForm.invest).toFixed(10), "ether"),
            gas: 200000,
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
        this.accountForm.get = bn(e.srcElement.value).multipliedBy(this.price).dividedBy(tokenPrice);
      },
      enqInput(e) {
        this.accountForm.invest = bn(e.srcElement.value).dividedBy(this.price).multipliedBy(tokenPrice);
      }
    },
    mounted() {
      axios.get('https://api.coinmarketcap.com/v2/ticker/1027/?convert=USD').then(res => {
        this.price = res.data.data.quotes.USD.price;
        let e = {
          srcElement: {
            value: 1
          }
        }
        this.ethInput(e);
      });
    }
  }
</script>
