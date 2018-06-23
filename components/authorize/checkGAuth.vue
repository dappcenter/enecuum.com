<template>
  <el-row class="authorize full-selector flex-center">
    <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
      <h1 class="text-center">Enable 2-Step Verification</h1>
      <el-form :model="twoAuthForm" :rules="twoAuthFormRules" ref="twoAuthForm" @submit.native.prevent="submitForm">
        <el-row class="flex-center">
          <el-col :span="16">
            <img :src="qr" alt="" style="width: 100%;">
          </el-col>
        </el-row>
        <br>
        <el-row class="flex-center">
          <el-col :span="16">
            <el-alert
              :title="secret"
              type="info"
              center
              :closable="false">
            </el-alert>
          </el-col>
        </el-row>
        <br>
        <el-row class="flex-center">
          <el-col :span="16">
            <el-form-item prop="code">
              <el-input v-model="twoAuthForm.code" placeholder="2FA Code" :disabled="'disabled' ? loading : null"
                        @keyup.native="submitForm"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row class="flex-center">
        <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Submit</el-button>
      </el-row>
    </el-col>
    <vue-recaptcha size="invisible" :sitekey="recaptchaKey" @verify="onVerify"
                   ref="invisibleRecaptcha"></vue-recaptcha>
  </el-row>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "checkGAuth",
    middleware: 'check2auth',
    props: {
      kyc: Object
    },
    data() {
      return {
        qr: null,
        secret: '',
        loading: false,
        twoAuthForm: {
          code: ''
        },
        twoAuthFormRules: {
          code: [{
            required: true,
            message: 'This field is required'
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
      onVerify(response) {
        this.send2Fa(response);
      },
      submitForm() {
        if (this.twoAuthForm.code && this.twoAuthForm.code.toString().length < 6) return false;
        this.$refs['twoAuthForm'].validate((valid) => {
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
      send2Fa(captcha) {
        let data = this.twoAuthForm;
        data.recaptcha = captcha;
        this.loading = true;
        let isTwoauthed = this.$store.dispatch('set2fa', data);
        isTwoauthed.then(res => {
          res.code === 200 ? this.$router.push('/backoffice/') : this.$notify({
            title: 'Warning',
            type: 'warning',
            message: this.$store.state.lang[res.code],
            position: 'bottom-left'
          });
          this.$refs.invisibleRecaptcha.reset();
          this.loading = false;
        });
      },
      get2Fa() {
        let info = this.$store.state.info2fa;
        this.qr = info.qr;
        this.secret = info.secret;
      }
    },
    mounted() {
      this.get2Fa();
    }
  }
</script>
