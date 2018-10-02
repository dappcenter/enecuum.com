<template>
  <div class="bgmain">
    <div class="airdrop_container">
      <h2 class="airdrop-title title">
        Welcome to the Enecuum Airdrop campaign!

        We give <b>25 000 000</b> tokens for our bounty program. Complete the fields below, read the Airdrop terms of
        Airdrop and start earning with us right now!
      </h2>
      <div class="airdrop_form">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="email">Email:</label>
                <input type="text" id="email" v-model="user.email" @keyup.enter="login">
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
          </el-col>
        </el-row>
      </div>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="6">
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
              <button @click="login">
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
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login() {
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
          });
        } else {
          this.$notify({
            message: 'Email of password is empty',
            type: 'warning',
            position: 'bottom-left'
          });
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
