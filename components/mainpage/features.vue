<template>
  <div id="features">
    <el-row class="row features">
      <div class="features_block">
        <img src="img/mainpage/features/features.png" alt="">
      </div>
    </el-row>
    <el-row>
      <div class="features_carousel">
        <el-carousel :interval="4000" class="features_carousel-container" indicator-position="none"
                     @change="changeCarouselItem" :height="height">
          <el-carousel-item v-for="(slide, key) in data" :key="key" class="features_carousel-item">
            <div class="features_carousel-title">{{slide.TITLE}}</div>
            <div class="features_carousel-row">
              <img :src="slide.IMG" :alt="slide.TITLE">
              <div class="features_carousel-text">
                <b>{{slide.SUB_TITLE}}</b>
                {{slide.TEXT}}
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "features",
    props: ['data'],
    data() {
      return {
        height: '300px'
      }
    },
    methods: {
      changeCarouselItem() {
        this.changeHeight();
      },
      changeHeight() {
        let carRow = document.querySelector('.features_carousel-item.is-active div.features_carousel-row');
        if (carRow) {
          this.height = carRow.clientHeight + 120 + 'px';
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.changeHeight();
      }, 1000);
    }
  }
</script>
