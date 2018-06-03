<template>
  <div id="features">
    <el-row class="row features">
      <div class="features_block">
        <img src="img/mainpage/features/features.png" alt="">
      </div>
    </el-row>
    <el-row>
      <div class="features_carousel">
        <el-carousel :interval="40000" class="features_carousel-container" indicator-position="none"
                     @change="changeCarouselItem" :height="height" :arrow="arrow">
          <el-carousel-item v-for="(slide, key) in data" :key="key" class="features_carousel-item">
            <div class="features_carousel-title">{{slide.TITLE}}</div>
            <div class="features_carousel-row">
              <img :src="slide.IMG" :alt="slide.TITLE">
              <div class="features_carousel-text">
                <div>
                  <b>{{slide.SUB_TITLE}}</b>
                  {{slide.TEXT}}
                </div>
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
        height: '300px',
        arrow: "always"
      }
    },
    methods: {
      changeCarouselItem(index) {
        this.changeHeight(index);
      },
      changeHeight(index) {
        let carRow = document.querySelectorAll('.features_carousel-item div.features_carousel-row');
        if (carRow.length) {
          let carRowLength = carRow.length - 1;
          let currentRow = carRow[carRowLength - (carRowLength - index)];
          this.height = currentRow.clientHeight + 100 + 'px';
        }
      }
    },
    mounted() {
      if(window.innerWidth < 768) {
        this.arrow = 'hover';
      }
      setTimeout(() => {
        this.changeHeight(0);
      }, 1000);
    }
  }
</script>
