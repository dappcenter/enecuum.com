<template>
  <section class="container">
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="12" :lg="10" :xl="8">
        <signin v-if="signinShow" @restore="signinShow=false"></signin>
        <restore v-else @back="signinShow=true"></restore>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import signin from '@/components/authorize/signin';
  import restore from '@/components/authorize/restorePassword';

  export default {
    name: "signIn",
    data() {
      return {
        signinShow: true,
        currentComponent: restore
      }
    },
    components: {
      signin,
      restore
    }
  }
</script>
