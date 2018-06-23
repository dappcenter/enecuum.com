<template>
  <section class="container kyc" :class="{'flex-middle':kyc.code!==511}">
    <component :is="currentComponent" :kyc="kyc"></component>
  </section>
</template>

<script>
  import complete from '@/components/kyc/complete';
  import kycform from '@/components/kyc/kycform';
  import walletVerify from '@/components/account/walletVerify';

  export default {
    name: "kyc",
    middleware: 'auth',
    components: {
      kycform,
      complete,
      walletVerify
    },
    data() {
      return {
        interval: '',
        currentComponent: null,
        countries: null
      }
    },
    computed: {
      kyc() {
        this.setComponent(this.$store.state.kyc.code);
        return this.$store.state.kyc;
      }
    },
    methods: {
      setComponent(statusCode) {
        switch (statusCode) {
          case 511:
            this.currentComponent = kycform;
            break;
          case 202:
            this.currentComponent = walletVerify;
            break;
          default:
            this.currentComponent = complete;
            break;
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.interval);
      next()
    }
  }
</script>
