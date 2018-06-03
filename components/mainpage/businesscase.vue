<template>
  <div class="business" id="business">
    <div class="title">
      {{data.title}}
    </div>
    <div class="business_carousel-tabs">
      <el-tabs v-model="activeTab" :tab-position="tabpos" @tab-click="switchSlide">
        <el-tab-pane v-for="(item, skey) in data.slider" :key="skey" :label="item.BAR" :name="item.BAR"
                     class="item"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="business_carousel">
      <el-carousel ref="carousel" :interval="4000" arrow="never" class="business_carousel-container enq-carousel"
                   @change="changeCarouselItem"
                   :height="height"
                   indicator-position="none">
        <el-carousel-item v-for="(slide, key) in data.slider" :key="key" class="business_carousel-item">
          <div class="business_carousel-row">
            <div>
              <div class="business_carousel-title">
                {{slide.TITLE}}
              </div>
              <img :src="slide.IMG" :alt="slide.TITLE">
            </div>
            <div class="business_carousel-text">
              <p>{{slide.TEXT.BLOCK_1}}</p>
              <p>{{slide.TEXT.BLOCK_2}}</p>
              <p>{{slide.TEXT.BLOCK_3}}</p>
            </div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
  export default {
    name: "businesscase",
    props: ['data'],
    data() {
      return {
        height: '400px',
        activeTab: '',
        tabpos: 'top'
      }
    },
    methods: {
      switchSlide(tab) {
        this.$refs.carousel.setActiveItem(tab.index);
      },
      changeCarouselItem(index) {
        this.activeTab = this.data.slider[index].BAR;
        this.changeHeight();
      },
      changeHeight() {
        let carRow = document.querySelector('.business_carousel-item.is-active div.business_carousel-row');
        if (carRow) {
          this.height = carRow.clientHeight + 50 + 'px';
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
