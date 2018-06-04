<template>
  <div class="kyc-status">
    <h1 class="text-center">
      <div :class="'kyc-status-'+kyc.code"></div>
    </h1>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="16">
        <h2 class="text-center title-middle" v-html="kyc.message"></h2>
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
    mounted() {
      setTimeout(() => {
        this.kyc.code === 201 ? this.$router.push('/') : null;
      }, 15000);
    }
  }
</script>
