<template>
  <div class="authorize">
    <el-row class="flex-center flex-column">
      <h1 class="h3">Sign In</h1>
      <p>Personal account</p>
      <el-form :model="signInForm" :rules="signInFormRules" ref="signInForm" class="authorize_form">
        <el-form-item prop="email">
          <el-input v-model="signInForm.email" placeholder="Login" @keyup.enter.native="submitForm"
                    :disabled="'disabled' ? loading : null"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="signInForm.password" type="password" placeholder="Password"
                    @keyup.enter.native="submitForm" :disabled="'disabled' ? loading : null"></el-input>
        </el-form-item>
        <div v-if="show2FA">
          <el-form-item>
            <el-input v-model="code" type="text" placeholder="2FA Code" :disabled="'disabled' ? loading : null"
                      @keyup.native="submit2FA"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="neon" @click="submit2FA" :loading="loading">Submit</el-button>
          </el-form-item>
        </div>
        <el-form-item prop="confirm_password" v-if="!show2FA">
          <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Sign In</el-button>
          <el-button type="text" @click="restore">Forgot password?</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <vue-recaptcha size="invisible" :sitekey="recaptchaKey" @verify="onVerify"
                   ref="invisibleRecaptcha"></vue-recaptcha>
  </div>
</template>

<script>
  import validators from '../kyc/validators';
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "signin",
    data() {
      const validateEmail = validators.email;
      return {
        loading: false,
        signInForm: {
          email: '',
          password: '',
        },
        show2FA: false,
        code: null,
        signInFormRules: {
          email: [
            {validator: validateEmail, trigger: 'change'}
          ],
          password: [
            {required: true, message: 'This field can not be empty'}
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
        this.show2FA ? this.send2FA(response) : this.signinForm(response);
      },
      restore() {
        this.$emit('restore');
      },
      submit2FA() {
        if (this.code.toString().length < 6) return false;
        this.loading = true;
        this.$refs.invisibleRecaptcha.execute();
      },
      send2FA(captcha) {
        let data = {code: this.code};
        data.recaptcha = captcha;
        let isSubmitted = this.$store.dispatch('set2fa', data);
        isSubmitted.then(res => {
          if (res.code === 200) {
            this.$store.commit('SET_AUTH', true);
            this.$router.push('/backoffice/kyc');
            this.$refs['signInForm'].resetFields();
          } else {
            this.$notify({
              message: this.$store.state.lang[res.code],
              type: 'error',
              position: 'bottom-left'
            });
          }
          this.loading = false;
        });
        this.$refs.invisibleRecaptcha.reset();
      },
      submitForm() {
        let form = this.$refs.signInForm;
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
      signinForm(captcha) {
        let data = this.signInForm;
        data.recaptcha = captcha;
        let isSended = this.$store.dispatch('signIn', data);
        isSended.then((res) => {
          if (res.ok) {
            if (res.code === 100) {
              this.show2FA = true;
            } else if (res.code === 200) {
              this.$store.commit('SET_AUTH', true);
              this.$router.push('/backoffice/kyc');
            } else {
              this.$router.push({path: '/auth/2fa', params: {code: res.code}});
            }
          } else {
            this.$notify({
              title: 'Error',
              message: this.$store.state.lang[res.code],
              type: 'error',
              position: 'bottom-left'
            });
          }
          this.$refs.invisibleRecaptcha.reset();
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
