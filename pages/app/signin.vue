<template>
  <div class="bgmain">
    <div class="airdrop_container">
      <h2 class="airdrop-title title">
        Welcome to the Enecuum Airdrop campaign!

        <b>5 000 000</b> tokens will be distributed! Complete the fields below, read the Airdrop terms and conditions
        and start earning tokens right now!
      </h2>
      <div class="airdrop_form" v-if="resetpwd">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="remail">Email:</label>
                <input type="email" id="remail" v-model="reset.email" @keyup.enter="login">
              </div>
            </div>
            <el-button type="text" @click="resetpwd=false">Back</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="airdrop_form" v-else>
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="user.email" @keyup.enter="login">
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="user.password" @keyup.enter="login">
              </div>
            </div>
            <el-button type="text" @click="resetpwd=true">Reset password</el-button>
          </el-col>
        </el-row>
      </div>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="8">
          <div class="input_group-wrapper">
            <div class="input_group button">
              <router-link to="/app/signup">
                <button>I'm not signed up</button>
              </router-link>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="input_group-wrapper">
            <div class="input_group button">
              <button @click="login" v-if="resetpwd" :disabled="loading">
                Change password
              </button>
              <button @click="login" v-else>
                Open tomorrow now
              </button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "signup",
    layout: 'airdrop',
    data() {
      return {
        resetpwd: false,
        loading: false,
        reset: {
          email: ''
        },
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
        this.loading = true;
        if (this.resetpwd) {
          let reseted = this.$store.dispatch('restorePasswordCode', this.reset);
          reseted.then(res => {
            if (res.ok) {
              this.$notify({
                message: res.message,
                type: 'success',
                position: 'bottom-left'
              });
              this.resetpwd = false;
            } else {
              this.$notify({
                message: res.message,
                type: 'error',
                position: 'bottom-left'
              });
            }
            this.loading = false;
          })
        } else {
          if (this.user.email && this.user.password) {
            let logged = this.$store.dispatch('airdropLogin', this.user);
            logged.then(res => {
              if (res.ok) {
                this.$router.push('/app/backoffice');
              } else {
                this.$notify({
                  message: 'Incorrect email or password',
                  type: 'error',
                  position: 'bottom-left'
                });
              }
              this.loading = false;
            });
          } else {
            this.$notify({
              message: 'Email or password is empty',
              type: 'warning',
              position: 'bottom-left'
            });
            this.loading = false;
          }
        }
      }
    },
    mounted() {
      let isAuthed = this.$store.dispatch('isAirdropAuth', {cookies: this.$store.state.cookies});
      isAuthed.then(res => {
        if (res == 'success') {
          this.$router.push('/app/backoffice');
        }
      });
    }
  }
</script>
