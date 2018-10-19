<template>
  <div class="bgmain">
    <div class="airdrop_container">
      <h2 class="airdrop-title title">
        Welcome to the Enecuum Airdrop campaign!

        <b>5 000 000</b> tokens will be distributed! Complete the fields below, read the Airdrop terms and conditions
        and start earning tokens right now!
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
        </el-row>
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="email">E-mail:</label>
                <input type="email" id="email" v-model="user.email" @keyup.enter="register">
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="input_group-wrapper">
              <div class="input_group">
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="user.password" @keyup.enter="register">
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
          <el-col :xs="24" :sm="12">
            <div class="subscr">
              Certain jurisdictions may make it unlawful for us to deliver tokens to you; therefore, you may not be
              eligible to receive tokens depending on your country of citizenship. We are consistently monitoring the
              regulatory landscape to enable delivery of tokens to as many people as possible.
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
      <el-row type="flex" justify="center" class="input_group-row">
        <el-col :xs="24" :sm="8">
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
              <button @click="register" :disabled="loading">
                Open tomorrow now
              </button>
            </div>
          </div>
        </el-col>
      </el-row>
      <vue-recaptcha size="invisible" :sitekey="recaptchaKey" ref="invisibleRecaptcha"
                     @verify="onVerify"></vue-recaptcha>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "aidrop_signup",
    layout: 'airdrop',
    data() {
      return {
        countries: [],
        loading: false,
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
        this.submit();
      },
      register() {
        this.loading = true;
        this.$refs.invisibleRecaptcha.execute();
        this.loading = false;
      },
      submit() {
        console.log(this.loading);
        if (!this.terms) {
          this.$notify({
            message: 'Please accept the terms',
            type: 'warning',
            position: 'bottom-left'
          });
          this.$refs.invisibleRecaptcha.reset();
          return false;
        }
        if (this.user.name && this.user.surname && this.user.email && this.user.password && this.user.country) {
          if (this.user.country === 'Country of citizenship') {
            this.$notify({
              message: 'Please select country of your citizenship',
              type: 'warning',
              position: 'bottom-left'
            });
            this.$refs.invisibleRecaptcha.reset();
            return false;
          }
          let regex = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])';
          let isEmail = this.user.email.match(regex);
          if (!isEmail) {
            this.$notify({
              message: 'Email is not valid',
              type: 'warning',
              position: 'bottom-left'
            });
            this.$refs.invisibleRecaptcha.reset();
            return false;
          }
          this.loading = true;
          if (localStorage.getItem('enqWallet')) {
            this.user.enqWallet = localStorage.getItem('enqWallet');
          }
          let logged = this.$store.dispatch('airdropRegister', this.user);
          logged.then(res => {
            if (res.ok) {
              this.$router.push('/app/backoffice');
            } else {
              if (res.message) {
                this.user.name = '';
                this.user.surname = '';
                this.user.email = '';
                this.user.password = '';
                this.$alert(res.message, 'Registration', {
                  confirmButtonText: 'OK'
                });
              } else {
                this.$notify({
                  message: 'Some fields are empty',
                  type: 'warning',
                  position: 'bottom-left'
                });
              }
              this.$refs.invisibleRecaptcha.reset();
            }
            this.loading = false;
          })
        } else {
          this.$notify({
            message: 'Some fields are empty',
            type: 'warning',
            position: 'bottom-left'
          });
          this.$refs.invisibleRecaptcha.reset();
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
      if (this.$route.query.enq || this.$route.query.ENQ) {
        let enqWallet = this.$route.query.enq || this.$route.query.ENQ;
        localStorage.setItem('enqWallet', enqWallet);
      } else {
        localStorage.removeItem('enqWallet');
      }
    }
  }
</script>
