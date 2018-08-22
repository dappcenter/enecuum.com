<template>
  <el-row class="row banner" id="enq">
    <div class="banner-wrapper">
      <div class="banner-inner">
        <div class="banner-content">
          <div class="banner-title">{{data.title}}</div>
          <div class="banner-description">{{data.subtitle}}</div>
        </div>
      </div>
      <div class="social">
        <a v-for="(item, key) in social" :key="key" :href="item.link" target="_blank"
           @click="a({category: 'social', eventAction: 'click', eventLabel: item.type})">
          <img :src="'/'+item.img" alt="">
        </a>
      </div>
    </div>
  </el-row>
</template>

<script>
  export default {
    name: "banner",
    props: ['data'],
    data() {
      return {}
    },
    computed: {
      social() {
        return this.$store.state.social;
      }
    }
  }
</script>
