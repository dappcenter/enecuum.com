<template>
  <div class="breakThrought pureBlock" id="tech">
    <div id="dna" class="jarallax" data-speed="-0.2">
      <img src="/img/dnaLong-2.png" alt="" class="jarallax-img">
    </div>
    <el-row type="flex" justify="center">
      <el-col :md="22" :lg="18" class="pureBlock-title">
        <el-row>
          <el-col :xs="24" :sm="24">
            <div class="breakThrought-buttons"><a href="/docs/Enecuum_WP.pdf" class="enq-button enq-button--blue" target="_blank"
                    @click="a({category: 'docs', eventAction: 'open', eventLabel: 'whitepaper'})">
              {{data.wp}}
            </a>
              <a href="/docs/Enecuum_WP_KO.pdf" class="enq-button enq-button--blue" target="_blank"
                 @click="a({category: 'docs', eventAction: 'open', eventLabel: 'whitepaper_ko'})">
                {{data.wp_ko}}
              </a><a href="/docs/onepager.pdf" class="enq-button enq-button--blue" target="_blank"
                     @click="a({category: 'docs', eventAction: 'open', eventLabel: 'onepager'})">
                {{data.onepager}}
              </a></div>
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
          <img src="/img/mainpage/dna-2.png" alt="">
        </div>
        <el-row>
          <el-col :xs="24" :sm="12">
            <div class="pureBlock-description-text">
              {{description}}
            </div>
            <ul class="enq-list">
              <li v-for="(li, key) in data.list" :key="key" @click="open(li, key)" v-if="key!==hide"><i
                class="el-icon-arrow-right"></i>{{li.title}}
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "breakthroughTech",
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
      this.description = this.data.list[0].description;
      this.title = this.data.list[0].title;
    }
  }
</script>
