<template>
  <div class="authorize">
    <el-row class="flex-center flex-column">
      <h1 class="h3">Sign Up</h1>
      <p>1. Email, password</p>
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
        </el-form-item>
      </el-form>
      <vue-recaptcha size="invisible" sitekey="Your key here"></vue-recaptcha>
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
      VueRecaptcha
    },
    methods: {
      submitForm() {
        let form = this.$refs.signUpForm;
        form.validate((valid) => {
          if (valid) {
            this.signupForm();
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      },
      signupForm() {
        if ((this.signUpForm.password !== this.signUpForm.confirm_password) || !this.signUpForm.password) {
          this.$notify({
            title: 'Info',
            message: res.success,
            type: 'Passwords don\'t match',
            position: 'bottom-left'
          });
          return false;
        }
        let data = this.signUpForm;
        //data.cq_user = this.getFinger();
        this.loading = true;
        let isSended = this.$store.dispatch('signUp', data);
        isSended.then((res) => {
          if (res.ok) {
            this.a({category: 'signup', eventAction: 'success', eventLabel: 'reg'});
            this.$notify({
              title: 'Success',
              message: res.success,
              type: 'success',
              position: 'bottom-left'
            });
            this.$refs['signUpForm'].resetFields();
            this.$router.push('/kyc');
          } else {
            this.$notify({
              title: 'Error',
              message: res.error,
              type: 'error',
              position: 'bottom-left'
            });
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
