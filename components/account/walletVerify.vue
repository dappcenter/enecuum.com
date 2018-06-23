<template>
  <el-row class="authorize full-selector flex-center">
    <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
      <h1 class="text-center">Wallet Verification</h1>
      <el-alert
        class="enq-alert"
        :title="'Pay attention: you will not be able to change the address of the wallet after confirmation, only the investment from specified address will be accepted during the private sale'"
        type="warning"
        :closable="false">
      </el-alert>
      <el-form :model="walletForm" :rules="walletFormRules" ref="walletForm">
        <el-row class="flex-center">
          <el-col :span="22">
            <el-form-item prop="wallet">
              <el-input v-model="walletForm.ethWalletNumber" placeholder="Wallet address"></el-input>
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
        <el-button type="primary" class="neon" @click="submitForm" :disabled="!agree ? 'disabled' : null"
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

  export default {
    name: "walletVerify",
    props: {
      kyc: Object
    },
    data() {
      return {
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
              message: 'it\'s amazing! You read the terms in less than ' + Math.round(totalSeconds) + ' seconds',
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
        let data = this.walletForm;
        this.loading = true;
        data.recaptcha = captcha;
        let isVerify = this.$store.dispatch('walletVerification', data);
        isVerify.then(res => {
          if (res.code === 200 || res.code === 423) {
            this.$notify({
              title: 'Success',
              type: 'success',
              message: this.$store.state.lang[res.code],
              position: 'bottom-left'
            });
            this.$router.push('/backoffice');
          } else {
            this.$notify({
              title: 'Error',
              type: 'error',
              message: this.$store.state.lang[res.code],
              position: 'bottom-left'
            });
            this.$refs.invisibleRecaptcha.reset();
          }
          this.loading = false;
        });
      }
    },
    mounted() {
      this.walletForm.ethWalletNumber = this.kyc.message.wallet;
    }
  }
</script>
