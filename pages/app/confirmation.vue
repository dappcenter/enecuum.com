<template>
  <div class="bgmain">
    <div class="airdrop_container">
      <div class="airdrop_form restore" v-if="showRestoreForm">
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="16">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" @keyup.enter="submit">
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="16">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="password">Confirm the password:</label>
                <input type="password" id="confpassword" v-model="user.confirmPassword" @keyup.enter="submit">
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row type="flex" justify="center">
          <el-col :xs="24" :sm="16">
            <div class="input_group-wrapper">
              <div class="input_group button">
                <button @click="submit">Submit</button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "confirmation",
    layout: 'airdrop',
    data() {
      return {
        showRestoreForm: false,
        user: {
          password: '',
          confirmPassword: ''
        }
      }
    },
    methods: {
      submit() {
        if (!this.user.password || !this.user.confirmPassword || this.user.password !== this.user.confirmPassword) {
          this.$notify({
            message: 'Password do not match',
            type: 'warning',
            position: 'bottom-left'
          });
          return false;
        }
        let data = this.user;
        data.code = this.$route.query.restore;
        let confirm = this.$store.dispatch('restorePassword', data);
        confirm.then(res => {
          if (res.ok) {
            this.$notify({
              message: 'Password was changed successfully',
              type: 'success',
              position: 'bottom-left'
            });
            this.$router.push('/app/signin');
          } else {
            this.$notify({
              message: res.message,
              type: 'warning',
              position: 'bottom-left'
            });
          }
        });
      }
    },
    mounted() {
      if (this.$route.query.code) {
        let confirm = this.$store.dispatch('checkConfirmationEmail', {
          verification: this.$route.query.code
        });
        confirm.then(res => {
          if (res.ok) {
            this.$notify({
              message: 'Welcome!',
              type: 'success',
              position: 'bottom-left'
            });
            this.$router.push('/app/backoffice');
          } else {
            this.$notify({
              message: res.message,
              type: 'warning',
              position: 'bottom-left'
            });
            this.$router.push('/app/signin');
          }
        });
      }
      if (this.$route.query.restore) {
        this.showRestoreForm = true;
      }
    }
  }
</script>
