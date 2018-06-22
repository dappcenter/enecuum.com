<template>
  <section class="container">
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
        <div class="authorize">
          <el-row class="flex-center flex-column">
            <h1 class="h3">Recover password</h1>
            <p>Please enter your email and new password</p>
            <el-form :model="signUpForm" :rules="signUpFormRules" ref="signUpForm" class="authorize_form">
              <el-form-item prop="email">
                <el-input v-model="signUpForm.email" placeholder="Email address"
                          @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item prop="tempPassword">
                <el-input type="password" v-model="signUpForm.tempPassword" placeholder="Temporary password"
                          @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="signUpForm.password" placeholder="New password"
                          @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item prop="confirm_password">
                <el-input type="password" v-model="signUpForm.confirm_password" placeholder="Confirm password"
                          @keyup.enter.native="submitForm" onpaste="return false;"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Submit</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <vue-recaptcha size="invisible" :sitekey="recaptchaKey" @verify="onVerify"
                   ref="invisibleRecaptcha"></vue-recaptcha>
  </section>
</template>

<script>
  import validators from '../../components/kyc/validators';
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
          tempPassword: '',
          confirm_password: '',
          hash: ''
        },
        signUpFormRules: {
          email: [
            {validator: validateEmail, trigger: 'change'}
          ],
          password: [
            {required: true, message: 'Password is required'}
          ],
          tempPassword: [
            {required: true, message: 'Temporary password is required'}
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
            type: 'info',
            message: 'Passwords don\'t match',
            position: 'bottom-left',
            showClose: false
          });
          return false;
        }
        if (this.signUpForm.tempPassword == this.signUpForm.password) {
          this.$notify({
            type: 'info',
            message: 'You must not use the temporary password as the primary password',
            position: 'bottom-left',
            showClose: false
          });
          return false;
        }
        let data = this.signUpForm;
        data.recaptcha = captcha;
        this.loading = true;
        let isSended = this.$store.dispatch('signinRecoveryPassword', data);
        isSended.then((res) => {
          if (res.ok) {
            this.$notify({
              title: 'Success',
              message: res.success,
              type: 'success',
              position: 'bottom-left'
            });
            this.$refs['signUpForm'].resetFields();
            this.$router.push('/auth/login');
          } else {
            this.$notify({
              title: 'Error',
              message: res.error ? res.error : this.$store.state.lang[res.code],
              type: 'error',
              position: 'bottom-left'
            });
          }
          this.loading = false;
          this.$refs.invisibleRecaptcha.reset();
        }).catch(() => {
          this.$notify({
            title: 'Error',
            message: "Something went wrong, sorry",
            type: 'error',
            position: 'bottom-left'
          });
        });
      }
    },
    mounted() {
      if (this.$route.params.hash) {
        this.signUpForm.hash = this.$route.params.hash;
      }
    }
  }
</script>
