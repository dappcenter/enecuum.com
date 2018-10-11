<template>
  <div class="bgmain">
    <div class="airdrop_container">
      <h2 class="airdrop-title title">
        Welcome to the Enecuum Airdrop campaign!

        We give <b>25 000 000</b> tokens for our bounty program. Complete the fields below, read the Airdrop terms of
        Airdrop and start earning with us right now!
      </h2>
      <div class="airdrop_form">
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
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {},
    mounted() {
      if (this.$route.query.code) {
        let confirm = this.$store.dispatch('checkConfirmationEmail', {
          verification: this.$route.query.code
        });
        confirm.then(res => {
          if (res.ok) {
            this.$router.push('/app/backoffice');
          } else {
            this.$notify({
              message: res.message,
              type: 'warning',
              position: 'bottom-left'
            });
          }
        });
      }
    }
  }
</script>
