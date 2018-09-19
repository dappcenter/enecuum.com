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
          <div class="banner-links">
            <div class="button-link-lang">
              <a href="/docs/pp_en.pdf" class="button-link blue" target="_blank">
                Whitepaper
              </a>
              <div class="flag">
                <a :href="item.url" v-for="(item, key) in wp" :key="key" target="_blank"><img
                  :src="'/img/flags/'+item.flag+'.png'" alt=""></a>
              </div>
            </div>
            <div class="button-link-lang">
              <a href="/docs/op_en.pdf" class="button-link blue" target="_blank">
                Onepager
              </a>
              <div class="flag">
                <a :href="item.url" v-for="(item, key) in op" :key="key" target="_blank"><img
                  :src="'/img/flags/'+item.flag+'.png'" alt=""></a>
              </div>
            </div>
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
        wp: [{
          flag: 'cn',
          url: '/docs/pp_cn.pdf'
        }, {
          flag: 'en',
          url: '/docs/pp_en.pdf'
        }, {
          flag: 'jp',
          url: '/docs/pp_jp.pdf'
        }, {
          flag: 'ko',
          url: '/docs/pp_ko.pdf'
        }],
        op: [{
          flag: 'cn',
          url: '/docs/op_cn.pdf'
        }, {
          flag: 'en',
          url: '/docs/op_en.pdf'
        }, {
          flag: 'jp',
          url: '/docs/op_jp.pdf'
        }, {
          flag: 'ko',
          url: '/docs/op_ko.pdf'
        }],
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
