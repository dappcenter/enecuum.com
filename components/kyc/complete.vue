<template>
  <div class="kyc-status">
    <h1 class="text-center">
      <div :class="'kyc-status-'+kyc.code"></div>
    </h1>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="16">
        <h2 class="text-center title-middle" v-html="message"></h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "complete",
    props: {
      kyc: Object
    },
    data() {
      return {
        message: ''
      }
    },
    mounted() {
      this.message = this.$store.state.lang[this.kyc.code];
      this.$parent.interval = setInterval(() => {
        this.kyc.code === 201 ? this.$router.push('/') : null;
      }, 15000);
      if (this.kyc.code === 202) {
        setTimeout(() => {
          this.$router.push('/backoffice');
        }, 2000);
      }
    }
  }
</script>
