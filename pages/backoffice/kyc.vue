<template>
  <section class="container kyc" :class="{'flex-middle':kyc.status}">
    <component :is="currentComponent" :kyc="kyc"></component>
  </section>
</template>

<script>
  import complete from '@/components/kyc/complete';
  import kycform from '@/components/kyc/kycform';
  import GAuth from '@/components/kyc/checkGAuth';
  import vesting from '@/components/kyc/vesting/tokenVesting';

  export default {
    name: "kyc",
    middleware: 'auth',
    components: {
      kycform,
      complete
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
      //this.currentComponent = GAuth;
      console.log(this.$store.state.kyc);
      this.$store.state.kyc.status ? this.currentComponent = complete : this.currentComponent = kycform;
    },
    watch: {
      '$store.state.kyc.code': function () {
        console.log(this.$store.state.kyc);
        //this.currentComponent = complete;
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.interval);
      this.$store.dispatch('logoutClient');
      next()
    }
  }
</script>
