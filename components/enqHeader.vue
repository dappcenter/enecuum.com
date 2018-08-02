<template>
  <div class="menu-wrapper" :class="{homepage:itsHomepage}">
    <div class="menu_logo-mobile">
      <transition name="fade">
        <div class="menu_logo-overlay" v-show="isOpened" @click="closeMenu"></div>
      </transition>
      <nuxt-link to="/"><img :src="itsHomepage ? '/img/logo-white.png': '/img/logo.svg'" alt="" class="menu_logo-img">
      </nuxt-link>
      <button class="menu_logo-hamburger" @click="openMenu" :style="itsHomepage ? 'color: #ffffff;' : ''"><i class="fa fa-bars" aria-hidden="true"></i></button>
    </div>
    <div class="flex-between menu" :class="{'menu-open': isOpened}">
      <el-menu :default-active="activeMenu" mode="horizontal" router class="menu-left">
        <nuxt-link to="/" class="menu_logo">
          <img :src="itsHomepage ? '/img/logo-white.png': '/img/logo.svg'" alt="" class="menu_logo-img"></nuxt-link>
        <el-menu-item index="/" class="menu-item">Home</el-menu-item>
        <el-menu-item index="/team" class="menu-item">Team</el-menu-item>
        <el-menu-item index="" class="menu-item"><a href="https://medium.com/@EnqBlockchain" target="_blank">Blog</a>
        </el-menu-item>
        <el-menu-item index="/calendar" class="menu-item">Calendar</el-menu-item>
        <el-menu-item index="/video" class="menu-item">Video</el-menu-item>
        <el-menu-item index="/press" class="menu-item">Press</el-menu-item>
        <el-menu-item index="/token" class="menu-item">Token</el-menu-item>
        <el-menu-item index="/faq" class="menu-item">FAQ</el-menu-item>
        <nuxt-link to="/privatesale" class="el-menu-item menu-item">
          <button class="enq-button default gold small">Private Sale</button>
        </nuxt-link>
      </el-menu>
      <ul class="el-menu--horizontal el-menu menu-right text-right" v-if="loadingFingerEnd || checkingAuth">
        <fingerLoader @onEnd="loadingFingerEnd=false"></fingerLoader>
      </ul>
      <ul class="el-menu--horizontal el-menu menu-right" v-else>
        <nuxt-link to="/auth/login" class="el-menu-item menu-item float-right" v-if="!isAuth">
          <el-button size="small" class="small-mini white">Sign In</el-button>
        </nuxt-link>
        <nuxt-link to="/auth/join" class="el-menu-item menu-item float-right" v-if="!isAuth">
          <el-button size="small" class="small-mini">Sign Up</el-button>
        </nuxt-link>
        <li class="el-menu-item float-right menu-item" v-if="isAuth" @click.prevent="logout">Logout</li>
        <nuxt-link to="/backoffice" class="el-menu-item menu-item float-right" v-if="isAuth">
          <el-button type="primary" size="small" class="small-mini">Backoffice</el-button>
        </nuxt-link>
      </ul>
      <div class="menu_submenu-wrapper" v-if="itsHomepage">
        <ul class="menu_submenu">
          <li class="menu_submenu-item"><a target="_self" href="#enq" @click.prevent="scrollTo('enq')">What is
            Enq</a>
          </li>
          <li class="menu_submenu-item"><a target="_self" href="#mining" @click.prevent="scrollTo('mining')">Phone
            mining</a></li>
          <li class="menu_submenu-item"><a target="_self" href="#tech"
                                           @click.prevent="scrollTo('tech')">Tech</a></li>
          <li class="menu_submenu-item"><a target="_self" href="#world"
                                           @click.prevent="scrollTo('world')">Changing the world</a></li>
          <li class="menu_submenu-item"><a target="_self" href="#bot"
                                           @click.prevent="scrollTo('bot')">BOT</a></li>
          <li class="menu_submenu-item"><a target="_self" href="#roadmap"
                                           @click.prevent="scrollTo('roadmap')">Roadmap</a></li>
          <li class="menu_submenu-item"><a target="_self" href="#partners" @click.prevent="scrollTo('partners')">Partners</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import socket from '~/plugins/socket.io.js'
  import fingerLoader from '@/components/authorize/loader'

  export default {
    name: "enq-header",
    middleware: 'auth',
    data() {
      return {
        activeMenu: '/',
        itsHomepage: false,
        isOpened: false,
        checkingAuth: true,
        loadingFingerEnd: true,
        waitingServerUpdateCount: 0,
        uniq: 0
      }
    },
    components: {
      fingerLoader
    },
    computed: {
      isAuth() {
        return this.$store.state.isAuth;
      },
      cq_user() {
        return this.$store.state.cq_user;
      }
    },
    methods: {
      setHomeClass() {
        this.$route.path === '/' ? this.itsHomepage = true : this.itsHomepage = false;
      },
      openMenu() {
        this.isOpened = true;
        document.querySelector('body').classList.add('openedMenu');
      },
      closeMenu() {
        this.isOpened = false;
        document.querySelector('body').classList.remove('openedMenu');
      },
      getCarrotQuest() {
        carrotquest.onReady(() => {
          axios.request({
            url: ' //api.enecuum.com/v1/carrotquest/' + this.cq_user,
            method: 'get',
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            }
          }).then((res) => {
            if (res.data.ok) {
              carrotquest.auth(this.cq_user, res.data.success);
            }
          })
        });
      },
      logout() {
        this.$store.dispatch('logoutServer');
        this.$router.push('/auth/login');
      },
      scrollTo(to) {
        Math.easeInOutQuad = function (t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        };

        to = document.getElementById(to).offsetTop;
        let duration = 1000;
        let start = document.documentElement.scrollTop + 100,
          change = to - start,
          currentTime = 0,
          increment = 20;

        let animateScroll = function () {
          currentTime += increment;
          let val = Math.easeInOutQuad(currentTime, start, change, duration);
          document.documentElement.scrollTop = val - 100;
          if (currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        };
        animateScroll();
      }
    },
    watch: {
      '$route': function () {
        this.activeMenu = this.$route.path;
        this.isOpened = false;
        this.setHomeClass();
        if (document.querySelector('.openedMenu')) {
          document.querySelector('.openedMenu').classList.remove('openedMenu');
        }
      }
    },
    mounted() {
      this.ainit();
      this.setHomeClass();
      socket.on('checked', (data) => {
        if (data !== 401) this.$store.dispatch('loginClient', data);
        this.checkingAuth = false;
      });
      socket.on('connectServer', (res) => {
        if (!this.uniq) {
          this.uniq = res;
        } else {
          if (this.uniq !== res) {
            this.uniq = res;
            this.$notify({
              title: 'Update',
              type: 'info',
              message: 'We are working hard to implement new features and make our site even better, we just updated it in the background, check out!',
              position: 'top-right',
              duration: 10000,
            })
          }
        }
      });
      socket.on('depositUpdates', (info) => {
        let me = (this.$store.state.web3wallet.toLocaleLowerCase() === info.sender.toLocaleLowerCase()) ? true : false;
        this.$notify({
          title: 'Transaction',
          type: me ? 'success' : 'info',
          dangerouslyUseHTMLString: true,
          message: '<p>' + (me ? 'You bought ' : '') + info.amount + ' tokens' + (me ? ' for ' : ' was sold for ') + info.ether + ' ether (' + (me ? '' : 'you can') + 'see <a target="_blank" href="https://etherscan.io/tx/' + info.tx + '">tx details</a>)</p>',
          position: 'bottom-left',
          duration: 10000,
          showClose: false
        });
      });
      setTimeout(() => {
        this.checkingAuth = false;
      }, 2000);
      document.addEventListener('scroll', (e) => {
        console.log();
        if (document.querySelector('.menu-wrapper.homepage')) {
          document.querySelector('.menu-wrapper.homepage').style.background = 'rgba(68, 195, 230, ' + window.scrollY / 100 + ')';
        }
      });
    },
    created() {
      this.activeMenu = this.$route.path;
      this.$store.dispatch('getLang');
    },
    head() {
      return {
        title: 'ENQ'
      }
    }
  }
</script>

<style scoped lang="scss">
  .menu {
    position: relative;
    background-color: #f8f9fa;
    border-bottom: 0px;
    &-item {
      &.is-active {
        border-color: #f97520;
      }
    }
    &-left {
      flex-grow: 1;
      z-index: 1;
      border-bottom: transparent;
      background-color: #f8f9fa;
      @media screen and (min-width: 991px) {
        padding-left: 54px;
      }
    }
    &-right {
      flex-grow: 1;
      z-index: 1;
      border-bottom: transparent;
      background-color: #f8f9fa;
      @media screen and (min-width: 991px) {
        padding-right: 54px;
      }
      @media screen and (max-width: 991px) {
        padding-bottom: 60px;
      }
    }
    &_logo {
      margin-right: 40px;
      float: left;
      display: flex;
      align-items: center;
      height: 80px;
      &-img {
        width: 135px;
        vertical-align: middle;
      }
      &-mobile {
        display: none;
      }
      &-hamburger {
        display: none;
      }
      &-overlay {
      }
    }
    &-wrapper {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      z-index: 1000;
      background-color: #f8f9fa;
      //box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.15);
      & + .container {
        padding-top: 85px;
      }
      &.homepage {
        background: transparent;
        .menu {
          background: transparent;
          &-item {
            color: #ffffff;
            &:hover {
              color: #2f8198;
            }
            &.is-active {
              color: #ffffff;
            }
          }
          &-left {
            background: transparent;
          }
          &-right {
            background: transparent;
          }
          @media screen and (max-width: 991px) {
            background: #27a7d1;
          }
        }
        &:hover {
          .menu_submenu {
            &-wrapper {
              //box-shadow: inset 0px 10px 40px -6px rgba(0, 0, 0, .10), 0px 2px 40px rgba(0, 0, 0, .10);
              background: #69cde7;
              opacity: 1;
              top: 80px;
            }
          }
        }
      }
    }
    &_submenu {
      //display: none;
      display: flex;
      padding-top: 10px;
      padding-bottom: 10px;
      &-wrapper {
        position: absolute;
        z-index: 0;
        padding-left: 150px;
        top: 20px;
        left: 0px;
        background: transparent;
        opacity: 0;
        width: 100%;
        transition: all 0.2s ease 0s;
        @media screen and (max-width: 991px) {
          display: none;
        }
      }
      &-item {
        list-style: none;
        margin: 0px 20px;
        a {
          display: block;
          padding: .5rem 1rem;
          color: #ffffff;
        }
      }
    }
    @media screen and (max-width: 1280px) {
      &_submenu {
        &-wrapper {
          padding-left: 50px;
        }
        &-item {
          a {
            font-size: 14px;
          }
        }
      }
      &-item {
        font-size: 14px;
        padding-left: 5px;
        padding-right: 5px;
        & button {
          font-size: 14px;
        }
      }
    }
    @media screen and (max-width: 991px) {
      display: none;
      height: 100%;
      overflow-y: scroll;
      position: fixed;
      right: 0px;
      top: 0px;
      padding: 0px;
      width: 200px;
      z-index: 3;
      text-align: right;
      flex-direction: column;
      animation: slideInLeft .2s both;
      &-item {
        width: 100%;
        text-align: center;
      }
      &_submenu {
        flex-direction: column;
        &-wrapper {
          position: relative;
          padding-left: 0px;
        }
        &-item {
          text-align: center;
          padding: 10px 0px;
        }
      }
      &-open {
        display: flex;
        animation: slideInRight .3s both;
      }
      &_logo {
        display: none;
        &-mobile {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
        }
        &-hamburger {
          display: block;
          font-size: 20px;
          padding: 5px;
          background-color: transparent;
          border: 0px;
          margin-right: 10px;
          cursor: pointer;
        }
        &-overlay {
          background-color: rgba(29, 34, 43, .5);
          position: fixed;
          width: 100%;
          height: 100%;
          left: 0px;
          right: 0px;
          top: 0px;
          bottom: 0px;
          z-index: 1;
        }
      }
    }
  }

  .float-right {
    float: right;
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(100%);
      visibility: visible;
    }
    100% {
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    0% {
      display: flex;
      transform: translateX(0);
    }
    100% {
      transform: translateX(100%);
      visibility: hidden;
      display: flex;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
