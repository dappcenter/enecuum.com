<template>
  <div class="roadmap flex-center" id="roadmap">
    <el-col :span="24" class="title">
      {{data.title}}
    </el-col>
    <el-col :xs="24" :sm="18" class="roadmap_block">
      <div class="roadmap_img">
        <img :src="data.img_desctop" alt="" class="roadmap_img-desktop">
        <img :src="data.img_mobile" alt="" class="roadmap_img-mobile">
      </div>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "roadmap",
    props: ['data']
  }
</script>
