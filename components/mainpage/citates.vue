<template>
  <el-carousel height="878px">
    <el-carousel-item v-for="(item, key) in img" :key="key">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "citates",
    data() {
      return {
        img: ['/img/mainpage/landings/09_citates_1.jpg', '/img/mainpage/landings/09_citates_2.jpg', '/img/mainpage/landings/09_citates_3.jpg']
      }
    }
  }
</script>

<style scoped>

</style>
