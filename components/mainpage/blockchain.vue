<template>
  <div class="breakThrought pureBlock" id="bot">
    <div id="dna" class="jarallax" data-speed="-0.4">
      <img src="/img/dnaLong-2.png" alt="" class="jarallax-img">
    </div>
    <el-row type="flex" justify="center">
      <el-col :md="22" :lg="18" class="pureBlock-title">
        <el-row>
          <el-col :xs="24" :sm="24">
            <div class="new title title-left title-bold">
              {{data.title}}
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :md="22" :lg="18" class="pureBlock-description blue-background">
        <div class="dna-img">
          <img src="/img/mainpage/dna-4.png" alt="">
        </div>
        <el-row>
          <el-col :xs="24" :sm="8" class="breakThrought-description">
            <div class="man-img">
              <img src="/img/mainpage/man.png" alt="">
            </div>
            <div class="pureBlock-description-text">
              {{data.description}}
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "blockchain",
    props: ['data']
  }
</script>
