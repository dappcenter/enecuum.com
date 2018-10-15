<template>
  <header>
    <div>
      <img src="/img/airdrop/bglogo.png" alt="" class="bg-logo">
      <div class="logo">
        <a href="https://enecuum.com"><img src="/img/airdrop/logo.png" alt=""></a>
      </div>
      <div class="menu-text" v-if="!auth">
        Enecuum is the world's first blockchain to unite millions of connected devices into a single network.
      </div>
      <div class="totalSupplyAirdrop">
        <el-progress :percentage="totalSupplyPercent" :stroke-width="18" :show-text="false"></el-progress>
        <div class="totalSupplyAirdrop_text" v-if="totalSupply!==0">
          {{currentAirdrop}} / {{totalSupply}} ENQ
        </div>
      </div>
    </div>
    <div>
      <div class="menu_responsive"></div>
      <div class="language_switcher">
        <span>English</span>
      </div>
      <div class="menu-text" v-if="auth">
        <div class="user_panel">
          <div class="user_panel-item">
            <span>Welcome</span>
            <span class="wc">{{mainuser.name}} {{mainuser.surname}}</span>
          </div>
          <div class="user_panel-item">
            <span>Your balance</span>
            <span class="wc">{{mainuser.total}}</span>
            <span>ENQ</span>
          </div>
          <div class="user_panel-item logout" @click="logout">
            <span><i class="fa fa-sign-out" aria-hidden="true"></i></span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import axios from 'axios';
  import socket from '~/plugins/socket.io.js';


  export default {
    name: "airdrop-header",
    data() {
      return {
        totalSupplyPercent: 0,
        totalSupply: 0,
        currentAirdrop: 0
      }
    },
    computed: {
      auth() {
        return this.$store.state.isAirdropAuth;
      },
      mainuser() {
        return this.$store.state.airdropUser;
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('airdropLogout');
        this.$router.push('/app/signin');
      }
    },
    mounted() {
      axios.get('/api/airdrop/getAllAirdrop').then(res => {
        if (res.data.ok) {
          this.totalSupply = res.data.message.totalSupply;
          this.currentAirdrop = res.data.message.totalAirdrop;
          this.totalSupplyPercent = (this.currentAirdrop / this.totalSupply) * 100;
        }
      });
      socket.on('airdrop', (res) => {
        if (res.data.ok) {
          this.totalSupply = res.data.message.totalSupply;
          this.currentAirdrop = res.data.message.totalAirdrop;
          this.totalSupplyPercent = (this.currentAirdrop / this.totalSupply) * 100;
        }
      });
    }
  }
</script>
