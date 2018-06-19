<template>
  <div class="authorize">
    <el-row class="flex-center flex-column">
      <h1 class="h3">Sign In</h1>
      <p>Personal account</p>
      <el-form :model="signInForm" :rules="signInFormRules" ref="signInForm" class="authorize_form">
        <el-form-item prop="email">
          <el-input v-model="signInForm.email" placeholder="Login" @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="signInForm.password" type="password" placeholder="Password"
                    @keyup.enter.native="submitForm"></el-input>
        </el-form-item>
        <a href="" class="authorize_forgot-password-link" @click.prevent="restore">Forgot password?</a>
        <el-form-item prop="confirm_password">
          <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Sign In</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
  import validators from '../kyc/validators';

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
    methods: {
      restore() {
        this.$emit('restore');
      },
      submitForm() {
        let form = this.$refs.signInForm;
        form.validate((valid) => {
          if (valid) {
            this.signinForm();
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      },
      signinForm() {
        let data = this.signInForm;
        this.loading = true;
        let isSended = this.$store.dispatch('signIn', data);
        isSended.then((res) => {
          if (res.ok) {
            this.$notify({
              title: 'Success',
              message: res.success,
              type: 'success',
              position: 'bottom-left'
            });
            this.$refs['signInForm'].resetFields();
            this.$router.push('/kyc');
            this.$store.commit('SET_AUTH', true);
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
    },
    mounted() {
      if (this.$route.params.hash) {
        console.log(this.$route.params.hash);
      }
    }
  }
</script>
