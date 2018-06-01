<template>
  <div class="phonemining flex-center">
    <el-col :md="22" :lg="18" class="phonemining-container">
      <el-row class="row reverse">
        <el-col :xs="24" :sm="12">
          <div class="title title-left">
            {{data.title}}
          </div>
          <div>
            {{data.description}}
          </div>
          <el-button type="primary" disabled class="button">
            {{data.button}}
          </el-button>
        </el-col>
        <el-col :xs="24" :sm="12"><img :src="data.img" alt=""></el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "phonemining",
    props: ['data']
  }
</script>
