<template>
  <section class="container kyc" :class="{'flex-middle':kyc.status}">
    <complete v-if="kyc.status" :kyc="kyc"></complete>
    <div class="authorize border-off-inputs" v-else>
      <el-row class="flex-center">
        <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
          <h1 class="h3">Fill out the registration form</h1>
          <p class="block-title">Account type</p>
          <el-row class="flex-center flex-between kyc_accountType">
            <el-button class="acType enq-button enq-button--blue-plain" :class="{'active': accountType==='private'}"
                       @click="accountType='private'">
              Private individual
            </el-button>
            <el-button class="acType enq-button enq-button--blue-plain" :class="{'active': accountType==='company'}"
                       @click="accountType='company'">
              Company
            </el-button>
          </el-row>
        </el-col>
      </el-row>
      <kycPrivate v-if="accountType==='private'" :countries="countries"></kycPrivate>
      <kycCompany v-else :countries="countries"></kycCompany>
    </div>
  </section>
</template>

<script>
  import kycPrivate from '@/components/kyc/private';
  import kycCompany from '@/components/kyc/company';
  import complete from '@/components/kyc/complete';
  import axios from 'axios';

  export default {
    name: "kyc",
    middleware: 'auth',
    components: {
      kycPrivate,
      kycCompany,
      complete
    },
    data() {
      return {
        accountType: 'private',
        interval: '',
        countries: null
      }
    },
    computed: {
      kyc() {
        return this.$store.state.kyc;
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.interval);
      next()
    },
    mounted() {
      axios.get('i18n/countries.json').then(res => {
        this.countries = res.data;
      });
    }
  }
</script>
