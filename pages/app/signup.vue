<template>
  <div class="bgmain">
    <div class="airdrop_container">
      <h2 class="airdrop-title title">
        Welcome to the Enecuum Airdrop campaign!

        We give <b>25 000 000</b> tokens for our bounty program. Complete the fields below, read the Airdrop terms of
        Airdrop and start earning with us right now!
      </h2>
      <div class="airdrop_form">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="name">Name:</label>
                <input type="text" id="name" v-model="user.name" @keyup.enter="register">
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="surname">Surname:</label>
                <input type="text" id="surname" v-model="user.surname" @keyup.enter="register">
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" v-model="user.email" @keyup.enter="register">
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <select v-model="user.country" placeholder="Country of citizenship">
                  <option selected disabled>Country of citizenship</option>
                  <option v-for="(item, key) in countries" :value="item.name" :key="key">{{item.name}}</option>
                </select>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" @keyup.enter="register">
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="subscr">
              Certain jurisdictions may make it unlawful for us to deliver tokens to you; therefore, you may not be
              eligible to receive tokens depending on your country of citizenship. We are consistently monitoring the
              regulatory landscape to be able to deliver tokens to as many people as possible.
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <el-col :xs="24">
          <div class="input_group-wrapper">
            <div class="input_group checkbox flex-center">
              <label class="input_group-checkbox">
                I accept the <a href="/docs/AirdropT&C.pdf" target="_blank">terms</a>
                <input type="checkbox" v-model="terms">
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center">
        <el-col :xs="24" :sm="6">
          <div class="input_group-wrapper">
            <div class="input_group button">
              <router-link to="/app/signin">
                <button>Already signed up</button>
              </router-link>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="8">
          <div class="input_group-wrapper">
            <div class="input_group button">
              <button @click="register">
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
  import axios from 'axios';

  export default {
    name: "aidrop_signup",
    layout: 'airdrop',
    data() {
      return {
        countries: [],
        terms: false,
        user: {
          name: '',
          surname: '',
          email: '',
          password: '',
          country: 'Country of citizenship'
        }
      }
    },
    methods: {
      register() {
        if (!this.terms) {
          this.$notify({
            message: 'Please accept the terms',
            type: 'warning',
            position: 'bottom-left'
          });
          return false;
        }
        if (this.user.name && this.user.surname && this.user.email && this.user.password && this.user.country) {
          if (this.user.country === 'Country of citizenship') {
            this.$notify({
              message: 'Please select country of your citizenship',
              type: 'warning',
              position: 'bottom-left'
            });
            return false;
          }
          let logged = this.$store.dispatch('airdropRegister', this.user);
          logged.then(res => {
            if (res.ok) {
              this.$router.push('/app/backoffice');
            } else {
              if (res.message) {
                this.$notify({
                  message: res.message,
                  type: 'warning',
                  position: 'bottom-left'
                });
              } else {
                this.$notify({
                  message: 'Some fields are empty',
                  type: 'warning',
                  position: 'bottom-left'
                });
              }
            }
          })
        } else {
          this.$notify({
            message: 'Some fields are empty',
            type: 'warning',
            position: 'bottom-left'
          });
        }
      }
    },
    mounted() {
      axios.get('/i18n/countries.json').then(res => {
        this.countries = res.data;
      });
      let isAuthed = this.$store.dispatch('isAirdropAuth', {cookies: this.$store.state.cookies});
      isAuthed.then(res => {
        if (res == 'success') {
          this.$router.push('/app/backoffice');
        }
      });
    }
  }
</script>
