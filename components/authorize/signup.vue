<template>
  <div class="authorize">
    <el-row class="flex-center flex-column">
      <h1 class="h3">Sign Up</h1>
      <p>Enter the email and password for your account</p>
      <el-form :model="signUpForm" :rules="signUpFormRules" ref="signUpForm" class="authorize_form">
        <el-form-item prop="email">
          <el-input v-model="signUpForm.email" placeholder="Email address" @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="signUpForm.password" placeholder="Password"
                    @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item prop="confirm_password">
          <el-input type="password" v-model="signUpForm.confirm_password" placeholder="Confirm password"
                    @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Sign Up</el-button>
          <a href="/app/backoffice">
            <el-button type="text">Airdrop</el-button>
          </a>
        </el-form-item>
        <vue-recaptcha size="invisible" :sitekey="recaptchaKey" ref="invisibleRecaptcha"
                       @verify="onVerify"></vue-recaptcha>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import validators from '../kyc/validators';
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "signup",
    data() {
      const validateEmail = validators.email;
      return {
        loading: false,
        signUpForm: {
          email: '',
          password: '',
          confirm_password: ''
        },
        signUpFormRules: {
          email: [
            {validator: validateEmail, trigger: 'change'}
          ],
          password: [
            {required: true, message: 'Password is required'}
          ],
          confirm_password: [
            {required: true, message: 'This field required'}
          ]
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
        this.signupForm(response);
      },
      submitForm() {
        let form = this.$refs.signUpForm;
        form.validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$refs.invisibleRecaptcha.execute();
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      },
      signupForm(captcha) {
        if ((this.signUpForm.password !== this.signUpForm.confirm_password) || !this.signUpForm.password) {
          this.$notify({
            title: 'Info',
            message: 'Passwords don\'t match',
            type: 'warning',
            position: 'bottom-left'
          });
          this.$refs.invisibleRecaptcha.reset();
          this.loading = false;
          return false;
        }
        let data = this.signUpForm;
        data.recaptcha = captcha;
        let isSended = this.$store.dispatch('signUp', data);
        isSended.then((res) => {
          if (res.ok) {
            this.a({category: 'signup', eventAction: 'success', eventLabel: 'reg'});
            this.$notify({
              title: 'Success',
              message: this.$store.state.lang[res.code],
              type: 'success',
              position: 'bottom-left'
            });
            this.$refs['signUpForm'].resetFields();
            this.$router.push('/auth/2fa');
          } else {
            this.$notify({
              title: 'Error',
              message: this.$store.state.lang[res.code],
              type: 'error',
              position: 'bottom-left'
            });
            this.$refs.invisibleRecaptcha.reset();
          }
          this.loading = false;
        }).catch(() => {
          this.$notify({
            title: 'Error',
            message: "Something went wrong, sorry",
            type: 'error',
            position: 'bottom-left'
          });
        });
      }
    }
  }
</script>
