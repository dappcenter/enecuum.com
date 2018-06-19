<template>
  <section class="container kyc" :class="{'flex-middle':kyc.status}">
    <component :is="currentComponent" :kyc="kyc"></component>
  </section>
</template>

<script>
  import complete from '@/components/kyc/complete';
  import kycform from '@/components/kyc/kycform';
  //import GAuth from '@/components/kyc/checkGAuth';
  //import vesting from '@/components/kyc/vesting/tokenVesting';


  export default {
    name: "kyc",
    middleware: 'auth',
    components: {
      kycform,
      complete,
      GAuth,
      vesting
    },
    data() {
      return {
        interval: '',
        currentComponent: complete,
        countries: null
      }
    },
    computed: {
      kyc() {
        return this.$store.state.kyc;
      }
    },
    mounted() {
      this.$store.state.kyc.status ? this.currentComponent = complete : this.currentComponent = kycform;
    },
    watch: {
      '$store.state.kyc.status': function () {
        this.currentComponent = complete;
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.interval);
      this.$store.dispatch('logoutClient');
      next()
    }
  }
</script>
