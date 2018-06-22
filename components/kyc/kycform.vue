<template>
  <div class="authorize border-off-inputs">
    <el-row class="flex-center flex-wrap">
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
</template>

<script>
  import kycPrivate from './formType/private';
  import kycCompany from './formType/company';
  import axios from 'axios';

  export default {
    name: "kycform",
    props: {
      kyc: Object
    },
    data() {
      return {
        accountType: 'private',
        countries: []
      }
    },
    components: {
      kycPrivate,
      kycCompany
    },
    mounted() {
      axios.get('/i18n/countries.json').then(res => {
        this.countries = res.data;
      });
    }
  }
</script>
