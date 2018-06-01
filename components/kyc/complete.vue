<template>
  <div>
    <h1 class="text-center page-title"></h1>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="16">
        <h2 class="text-center title-middle">{{text}}</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "complete",
    props: {
      text: String
    }
  }
</script>
