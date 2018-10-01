<template>
  <header>
    <div>
      <img src="/img/airdrop/bglogo.png" alt="" class="bg-logo">
      <div class="logo">
        <a to="https://enecuum.com"><img src="/img/airdrop/logo.png" alt=""></a>
      </div>
      <div class="menu-text" v-if="!auth">
        Enecuum is the world's first blockchain to unite millions of connected devices into a single network.
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
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: "airdrop-header",
    computed: {
      auth() {
        return this.$store.state.isAirdropAuth;
      },
      mainuser() {
        return this.$store.state.airdropUser;
      }
    }
  }
</script>
