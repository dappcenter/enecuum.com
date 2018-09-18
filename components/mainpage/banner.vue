<template>
  <el-row class="row banner" id="enq">
    <div class="banner-wrapper">
      <div class="banner-inner">
        <div class="banner-content">
          <div class="banner-title">{{data.title}}</div>
          <div class="enq-video">
            <iframe src="https://www.youtube.com/embed/GpPAfyFqbAE" frameborder="0" style="width: 100%; height: 360px;"
                    allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
          <div class="banner-description">{{data.subtitle}}</div>
          <div class="block-button">
            <a href="./docs/Enecuum_WP_EN.pdf" target="_blank" class="button-link blue">Whitepaper EN</a>
          </div>
          <div class="block-button">
            <a href="./docs/Enecuum_WP_KO.pdf" target="_blank" class="button-link blue">Whitepaper KO</a>
          </div>
          <div class="block-button">
            <a href="./docs/onepager.pdf" target="_blank" class="button-link blue">Onepager</a>
          </div>
        </div>
        <div class="social">
          <a v-for="(item, key) in social" :key="key" :href="item.link" target="_blank"
             @click="a({category: 'social', eventAction: 'click', eventLabel: item.type})">
            <img :src="'/'+item.img" alt="">
          </a>
        </div>
      </div>
    </div>
  </el-row>
</template>

<script>
  export default {
    name: "banner",
    props: ['data'],
    data() {
      return {
        activeAirdrop: []
      }
    },
    computed: {
      social() {
        return this.$store.state.social;
      }
    }
  }
</script>
