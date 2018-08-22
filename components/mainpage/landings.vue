<template>
  <el-row>
    <el-col :xs="24" :sm="12" v-for="(item, key) in landingsArr" :key="key">
      <div class="landing-wrapper">
        <div class="landing-img">
          <img :src="item.img" alt="">
        </div>
        <div class="landing-overlay"></div>
        <div class="landing-title">{{item.title}}</div>
        <div class="landing-description white full">
          {{item.description}}
        </div>
        <div class="landing-button">
          <button class="button-link">{{item.button}}</button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "landings",
    data() {
      return {
        landingsArr: [{
          title: 'Earn tokens',
          description: 'Any smartphone owner can join the Enecuum blockchain. Be amongst the first, download the Enecuum App today and start earning tokens',
          img: '/img/mainpage/landings/ln1.png',
          button: 'About app'
        }, {
          title: 'Why Enecuum',
          description: 'Enecuum is an ideal platform for companies that need a fast, secure, and decentralized blockchain. We are pleased to have created a technology that can radically ease various areas of life and business: from providing free mobile communication for subscribers to putting scientific breakthroughs within reach with unlimited computing capacity',
          img: '/img/mainpage/landings/ln2.png',
          button: 'About platform'
        }, {
          title: 'Trinity algorithm',
          description: 'Enecuum is the first blockchain enterprise to combine PoW, PoA, and PoS technologies in the blockchain of the future, providing unlimited speed, unlimited scalability, maximum decentralization and security. We called it the Trinity algorithm',
          img: '/img/mainpage/landings/ln3.png',
          button: 'About Technology'
        }, {
          title: 'Private sale',
          description: 'ENQ tokens are available to both private traders and larger funds upon successful KYC procedure completion',
          img: '/img/mainpage/landings/ln4.png',
          button: 'How to participate'
        }]
      }
    }
  }
</script>

<style scoped lang="scss">
  .landing {
    &-wrapper {
      position: relative;
      height: calc((100vh - 80px) / 2);
      overflow: hidden;
      &:hover {
        .landing-img {
          transition: .2s transform ease-out;
          transform: scale(1.1);
        }
        .landing-overlay {
          transition: .2s opacity ease-out;
          opacity: 0;
        }
        .landing-button {
          button {
            background-color: rgba(0, 159, 202, 0.2);
            &:hover {
              background-color: #009fca;
            }
          }
        }
      }
    }
    &-img {
      top: 0px;
      left: 0px;
      bottom: 0px;
      position: absolute;
      transition: .2s transform ease-out;
      img {
        height: 100%;
        width: 100%;
      }
    }
    &-overlay {
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      position: absolute;
      background-color: rgba(0, 159, 202, 0.5);
      transition: .2s opacity ease-out;
    }
    &-title {
      position: absolute;
      color: #ffffff;
      font-size: 40px;
      left: 85px;
      top: 50px;
    }
    &-description {
      position: absolute;
      left: 85px;
      top: 150px;
      color: #000000;
      width: 50%;
      &.white {
        color: #ffffff;
      }
      &.full {
        width: 80%;
      }
    }
    &-button {
      position: absolute;
      right: 40px;
      bottom: 40px;
    }
    @media screen and (max-width: 1440px) {
      &-title {
        font-size: 30px;
      }
      &-description {
        font-size: 12px;
      }
    }
    @media screen and (max-width: 991px) {
      &-wrapper {
        min-height: 400px;
      }
      &-title {
        top: 25px;
        left: 0px;
        width: 100%;
        text-align: center;
      }
      &-description {
        left: 0px;
        top: 100px;
        width: 100%;
        text-align: center;
        padding: 0px 15px;
      }
      &-img {
        img {
          width: auto;
        }
      }
    }
  }
</style>
