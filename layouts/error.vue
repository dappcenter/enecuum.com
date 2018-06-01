<template>
  <section class="container error">
    <el-row class="flex-center">
      <el-col :xs="20" :sm="10" :xl="8">
        <el-row class="flex-middle">
          <img src="/img/icons/notfound.svg" alt="" class="error_img">
          <h2 class="error_title">404</h2>
        </el-row>
        <el-row><p class="error_text">We can't find the page you're looking for. Check the URL, or head back gome.</p>
        </el-row>
        <el-row>
          <nuxt-link to="/">
            <el-button type="primary" class="neon error_home">
              Go home
            </el-button>
          </nuxt-link>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    name: "error",
    props: ['error'],
    mounted() {
      console.log(this.error);
    }
  }
</script>
