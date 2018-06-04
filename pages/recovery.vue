<template>
  <section class="container">
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
        <div class="authorize">
          <el-row class="flex-center flex-column">
            <h1 class="h3">Recovery form</h1>
            <p>Please enter your email and new password</p>
            <el-form :model="signUpForm" :rules="signUpFormRules" ref="signUpForm" class="authorize_form">
              <el-form-item prop="email">
                <el-input v-model="signUpForm.email" placeholder="Email address"
                          @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="signUpForm.password" placeholder="Password"
                          @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input type="password" v-model="signUpForm.tempPassword" placeholder="Temporary password"
                          @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item prop="confirm_password">
                <el-input type="password" v-model="signUpForm.confirm_password" placeholder="Confirm password"
                          @keyup.enter.native="submitForm"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="neon" @click="submitForm" :loading="loading">Submit</el-button>
              </el-form-item>
            </el-form>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import validators from '../components/kyc/validators';

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
          this.$message({
            type: 'danger',
            message: 'Passwords don\'t match'
          });
          return false;
        }
        if (this.signUpForm.tempPassword == this.signUpForm.password) {
          this.$message({
            type: 'danger',
            message: 'You must not use the temporary password as the primary password'
          });
          return false;
        }
        let data = this.signUpForm;
        if (this.cq_user) {
          data.cq_user = this.cq_user;
        }
        this.loading = true;
        let isSended = this.$store.dispatch('signinRecoveryPassword', data);
        isSended.then((res) => {
          if (res.ok) {
            this.$message({
              type: "success",
              message: res.success
            });
            this.$refs['signUpForm'].resetFields();
            this.$router.push('/signin');
          } else {
            this.$message({
              type: "error",
              message: res.error
            });
          }
          this.loading = false;
        }).catch(() => {
          this.$message({
            type: "error",
            message: "Something went wrong, sorry"
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
