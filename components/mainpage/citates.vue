<template>
  <el-carousel :height="height">
    <el-carousel-item v-for="(item, key) in carousel" :key="key">
      <div class="citaties-wrapper" :style="'background-image: url('+item.img+')'" :class="'car-'+key">
        <div class="citaties-inner">
          <div class="citaties-content">
            <h3 class="citaties-title">"{{item.title}}"</h3>
            <div class="citaties-person">{{item.person}}</div>
            <div class="citaties-subtitle">{{item.subtitle}}</div>
            <div class="citaties-avatar">
              <img :src="item.avatar" alt="">
            </div>
          </div>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
  export default {
    name: "citates",
    data() {
      return {
        height: '978px',
        carousel: [{
          title: 'This Hyper DAG thing is great!',
          person: 'Ran Neu-Ner',
          subtitle: 'Serial advisor, blockchain evangelist',
          avatar: '/img/mainpage/landings/carousel2-avatar.png',
          img: '/img/mainpage/landings/carousel1.png'
        }, {
          title: 'Phone mining - is next big thing in blockchain technologiy. All this computational power must be used for humanity good',
          person: 'Jorge Sebastio',
          subtitle: 'Ex-Huawei security, Enecuum advisor',
          avatar: '/img/mainpage/landings/carousel3-avatar.png',
          img: '/img/mainpage/landings/carousel1.png'
        }]
      }
    },
    methods: {
      resize() {
        if (window.innerWidth >= 768) {
          this.height = window.innerHeight - 80 + 'px';
        }
        if (window.innerWidth < 768) {
          this.height = '605px';
        }
      }
    },
    mounted() {
      this.resize();
      window.addEventListener('resize', this.resize);
    }
  }
</script>
