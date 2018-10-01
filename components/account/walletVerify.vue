<template>
  <el-row class="authorize full-selector flex-center">
    <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
      <h1 class="text-center">Wallet Verification</h1>
      <el-alert
        class="enq-alert"
        :title="'Pay attention: you will not be able to change the address of the wallet after confirmation, only the contribution from specified address will be accepted during the private sale'"
        type="info"
        ref="payalert"
        :closable="false">
      </el-alert>
      <el-alert :title="'Do not contribute from exchange addresses'" type="warning" center
                :closable="false">
      </el-alert>
      <el-form :model="walletForm" :rules="walletFormRules" ref="walletForm" class="mt40">
        <el-row class="flex-center">
          <el-col :span="22">
            <el-form-item prop="wallet">
              <el-input v-model="walletForm.ethWalletNumber" placeholder="Wallet address"
                        :disabled="loading"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="flex-center">
          <el-form-item :error="errorAgree">
            <el-checkbox v-model="agree" @change="checked">I agree with <a
              href="/docs/Enecuum_TokenSale_Terms_and_Conditions.pdf" target="_blank" @click="reading"
              class="unvisited">Token Sale Terms and Conditions</a>
            </el-checkbox>
          </el-form-item>
        </el-row>
      </el-form>
      <el-row class="flex-center">
        <el-popover
          placement="right"
          trigger="hover"
          content="Be patient, this can take a while"
          v-if="loading">
          <el-button slot="reference" type="primary" class="neon"><i class="el-icon-refresh"
                                                                     style="animation: rotating 2s linear infinite;animation-direction: reverse;"></i>
          </el-button>
        </el-popover>
        <el-button v-else type="primary" class="neon" @click="submitForm" :disabled="!agree ? 'disabled' : null"
                   :loading="loading">Save
        </el-button>
      </el-row>
    </el-col>
    <vue-recaptcha size="invisible" :sitekey="recaptchaKey" @verify="onVerify"
                   ref="invisibleRecaptcha"></vue-recaptcha>
  </el-row>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';
  import socket from '~/plugins/socket.io.js';

  export default {
    name: "walletVerify",
    props: {
      kyc: Object
    },
    data() {
      return {
        waitingNotif: {},
        loading: false,
        read: false,
        agree: false,
        errorAgree: '',
        timer: 0,
        walletForm: {
          ethWalletNumber: '',
          secondAgree: null
        },
        walletFormRules: {
          ethWalletNumber: [{
            required: true,
            message: "This field is required"
          }]
        }
      }
    },
    components: {
      'vue-recaptcha': VueRecaptcha
    },
    computed: {
      recaptchaKey() {
        return require('@/config/config.json').recaptchaKey;
      }
    },
    methods: {
      reading() {
        this.read = true;
        this.errorAgree = '';
        if (this.timer === 0) {
          let date = new Date().getTime();
          this.timer = date;
        }
      },
      checked() {
        if (!this.read) {
          this.agree = false;
          this.errorAgree = 'Please, read the terms first';
        }
        if (this.timer !== 0) {
          let totalSeconds = (new Date().getTime() - this.timer) / 1000;
          if (totalSeconds < 120) {
            this.$notify({
              type: 'info',
              duration: 5000,
              message: 'It\'s amazing! You read the terms in less than ' + Math.round(totalSeconds) + ' seconds',
              position: 'bottom-left',
              showClose: false
            });
          }
          this.timer = 0;
        }
      },
      onVerify(response) {
        this.sendWallet(response);
      },
      submitForm() {
        this.$refs['walletForm'].validate((valid) => {
          if (valid) {
            this.$refs.invisibleRecaptcha.execute();
          } else {
            this.$notify({
              title: 'Warning',
              type: 'warning',
              message: 'Please check the field',
              position: 'bottom-left'
            });
            return false;
          }
        });
      },
      sendWallet(captcha) {
        this.waitingNotif = this.$notify({
          title: 'Verification',
          type: 'info',
          message: 'Waiting for wallet to be added to whitelist. Synchronization may take up to 5 minutes depending on the load of the ethereum network',
          position: 'bottom-left',
          duration: 0
        });
        let data = this.walletForm;
        data.recaptcha = captcha;
        let idtime = new Date().getTime();
        localStorage.setItem('idle', idtime);
        console.log(idtime, localStorage.getItem('idle'));
        data.queryTime = idtime;
        this.loading = true;
        let isWhitelisted = this.$store.dispatch('setWhiteList', data);
        isWhitelisted.then(res => {
          console.log(res);
          this.$refs.invisibleRecaptcha.reset();
        });
      }
    },
    mounted() {
      socket.on('wl', ({ok, id}) => {
        console.log({ok, id});
        let idle = localStorage.getItem('idle');
        if (this.kyc.code === 202 && parseInt(idle) === parseInt(id)) {
          if (ok) {
            this.$router.push('/backoffice');
          } else {
            this.$notify({
              title: 'Verification',
              type: 'Error',
              message: 'Something went wrong please try late',
              position: 'bottom-left'
            });
          }
          this.waitingNotif.close();
          this.loading = false;
        }
      });
      this.walletForm.ethWalletNumber = this.kyc.message.wallet;
    }
  }
</script>
