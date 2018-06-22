<template>
  <section class="container">
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="10" :lg="8" :xl="6">
        <signup></signup>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import signup from '@/components/authorize/signup';

  export default {
    name: "signUp",
    components: {
      signup
    }
  }
</script>
