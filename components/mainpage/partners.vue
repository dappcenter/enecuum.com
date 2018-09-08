<template>
  <div class="partner pureBlock" id="partners" v-if="loaded">
    <el-row type="flex" v-for="(item, key) in data" :key="key" class="partner-flex">
      <div :class="'partner-title bg'+random(2)+(key===0 ? ' fr' : '')">
        <div>{{item.title}}</div>
      </div>
      <div class="partner-items">
        <el-col :class="'item bg'+random(4)" v-for="(partner, pkey) in item.items" :key="pkey"
                :style="calcWidth(item, pkey)" :xs="24">
          <div class="item-text">{{partner.text}}</div>
          <div class="item-img">
            <img :src="partner.img+'?v=0.0.1'" alt="">
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "partners",
    props: ['data'],
    data() {
      return {
        loaded: false
      }
    },
    methods: {
      calcWidth(item, index) {
        let incol = 3;
        let length = item.items.length;
        let resid = length % incol;
        if (window.outerWidth > 768) {
          if (length < 3) {
            return 'width: calc(' + (100 / length) + '%)';
          }
          if (resid === 0) {
            return 'width: calc(' + (100 / length) + '%)';
          }
          if (resid === 1) {
            if (index === length - 1) {
              return 'width: calc(' + (100 / 1) + '%)';
            } else {
              return 'width: calc(' + (100 / incol) + '%)';
            }
          }
          if (resid === 2) {
            if (index >= length - 2) {
              return 'width: calc(' + (100 / 2) + '%)';
            } else {
              return 'width: calc(' + (100 / incol) + '%)';
            }
          }
          /*          if (resid === 1 && index === length - resid) {
                      return 'width: calc(' + (100 / incol - 2) + '%)';
                    }
                    if (resid === 2 && index === length - resid) {
                      return 'width: calc(' + (100 / incol - 1) + '%)';
                    }*/
          //return 'width: calc(' + (100 / (length > 3 ? 3 : length)) + '%)';
        }
      },
      random(to) {
        return Math.round(Math.random() * to) + 1;
      }
    },
    mounted() {
      this.loaded = true;
    }
  }
</script>
<style scoped lang="scss">
  .partner {
    &-title {
      min-width: 605px;
      width: 605px;
      min-height: 260px;
      display: flex;
      padding: 50px 85px;
      font-size: 25px;
      text-transform: uppercase;
      color: #ffffff;
      &.fr {
        align-items: center;
        text-transform: initial;
        font-size: 90px;
        font-weight: bold;
      }
      &.bg1 {
        background-color: #009fca;
      }
      &.bg2 {
        background-color: #14a7ce;
      }
      &.bg3 {
        background-color: #0da4cd;
      }
    }
    &-items {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      .item {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        min-height: 260px;
        &.bg1 {
          background-color: rgba(202, 202, 202, .9);
        }
        &.bg2 {
          background-color: rgba(202, 202, 202, .8);
        }
        &.bg3 {
          background-color: rgba(202, 202, 202, .7);
        }
        &.bg4 {
          background-color: rgba(202, 202, 202, .6);
        }
        &.bg5 {
          background-color: rgba(202, 202, 202, .5);
        }
        &-text {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
          width: 100%;
          transition: .4s transform ease-out;
          transform: translateX(-101%);
          padding: 40px;
          color: #ffffff;
          background-color: #FF7400;
        }
        &-img {
          display: flex;
          height: 100%;
          width: 100%;
          align-items: center;
          justify-content: center;
          transition: .4s all ease-out;
          transform: translateX(0%);
          position: absolute;
          img {
            width: auto;
            padding: 40px;
          }
        }
        &:hover {
          .item-text {
            transform: translateX(0%);
          }
          .item-img {
            transform: translateX(100%);
          }
        }
      }
    }
    @media screen and (max-width: 1440px) {
      &-title {
        min-width: 260px;
        width: 260px;
        min-height: 180px;
        padding: 30px 15px;
        &.fr {
          font-size: 42px;
        }
      }
      &-items {
        &-item {
          min-height: 180px;
        }
      }
    }
    @media screen and (max-width: 768px) {
      &-title {
        font-size: 36px;
        min-width: auto;
        padding: 50px 15px;
        width: 100%;
        justify-content: center;
        align-items: center;
        &.fr {
          font-size: 46px;
        }
      }
      &-flex {
        flex-wrap: wrap;
      }
    }
  }
</style>
