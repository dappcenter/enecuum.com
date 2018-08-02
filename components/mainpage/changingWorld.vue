<template>
  <div class="breakThrought pureBlock" id="world">
    <div id="dna" class="jarallax" data-speed="-0.4">
      <img src="/img/dnaLong-2.png" alt="" class="jarallax-img">
    </div>
    <el-row type="flex" justify="center">
      <el-col :md="22" :lg="18" class="pureBlock-title">
        <el-row>
          <el-col :xs="24" :sm="24">
            <div class="new title title-left title-bold">
              {{title}}
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :md="22" :lg="18" class="pureBlock-description blue-background">
        <div class="dna-img">
          <img src="/img/mainpage/dna-3.png" alt="">
        </div>
        <el-row>
          <el-col :xs="24" :sm="12">
            <div class="pureBlock-description-text">
              {{description}}
            </div>
            <ul class="enq-list" v-for="(ul, ukey) in data.list" :key="ukey">
              <li v-for="(li, key) in ul" :key="key" @click="open(li, key)" v-if="key!==hide"><i class="el-icon-arrow-right"></i>{{li.title}}</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "changingWorld",
    props: ['data'],
    data() {
      return {
        description: '',
        title: '',
        hide: 0
      }
    },
    methods: {
      open(li, key) {
        this.description = li.description;
        this.title = li.title;
        this.hide = key;
      }
    },
    mounted() {
      this.description = this.data.list[0][0].description;
      this.title = this.data.list[0][0].title;
    }
  }
</script>
