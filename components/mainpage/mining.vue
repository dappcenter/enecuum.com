<template>
  <div class="mining flex-center" id="mining">
    <el-col :span="24">
      <div class="title">
        {{data.title}}
      </div>
    </el-col>
    <el-col :span="24">
      <div class="title title-mini">
        {{data.subtitle}}
      </div>
    </el-col>
    <el-col :md="22" :lg="18" class="mining_block-wrapper">
      <div class="mining_block">
        <div class="mining_block_steps"><b>{{data.blocks.title}}</b></div>
        <el-row class="row">
          <el-col :xs="24" :span="8" v-for="(item, key) in data.blocks.stages" :key="key">
            <div class="mining_block_img-block">
              <img :src="item.IMG" :alt="item.TITLE"
                   class="mining_block_img-main">
              <img src="img/mainpage/mining/mining_arrow.png" alt="arrow"
                   class="mining_block_img-arrow" v-if="key!==data.blocks.stages.length-1">
            </div>
            <div class="mining_block-text"><b>{{item.TITLE}}</b> <br> <br>
              <p>
                {{item.TEXT.BLOCK_1}}
              </p>
              <p>
                {{item.TEXT.BLOCK_2}}
              </p>
              <p>
                {{item.TEXT.BLOCK_3}}
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "mining",
    props: ['data']
  }
</script>
