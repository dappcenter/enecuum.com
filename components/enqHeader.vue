<template>
  <div class="menu-wrapper " :class="isfixedcolor">
    <div class="menu_logo-mobile">
      <transition name="fade">
        <div class="menu_logo-overlay" v-show="isOpened" @click="closeMenu"></div>
      </transition>
    </div>
    <div class="flex-between menu">
      <div class="menu_submenu-wrapper" :class="{'menu-open': isOpened}">
        <el-menu class="menu_mobile" :default-active="activeMenu" router>
          <!--<el-menu-item index="/" class="menu-item">Home</el-menu-item>-->
          <!--<el-menu-item index="/team" class="menu-item">Team</el-menu-item>-->
          <!--<el-menu-item index="" class="menu-item"><a href="https://medium.com/@EnqBlockchain" target="_blank">Blog</a>-->
          <!--</el-menu-item>-->
          <!--<el-menu-item index="/calendar" class="menu-item">Calendar</el-menu-item>-->
          <!--<el-menu-item index="/video" class="menu-item">Video</el-menu-item>-->
          <!--<el-menu-item index="/press" class="menu-item">Press</el-menu-item>-->
          <!--<el-menu-item index="/token" class="menu-item">Token</el-menu-item>-->
          <!--<el-menu-item index="/faq" class="menu-item">FAQ</el-menu-item>-->
          <div class="special-a-wrapper">
            <nuxt-link to="/privatesale" class="special-a">
              <button class="button-link orange">Private Sale</button>
            </nuxt-link>
            <a href="/app/backoffice" class="special-a">
              <button class="button-link orange">airdrop</button>
            </a>
          </div>
          <el-menu-item index="/auth/login" class="menu-item" v-if="!isAuth">
            <el-button type="text">Sign In</el-button>
          </el-menu-item>
          <el-menu-item index="/auth/join" class="menu-item" v-if="!isAuth">
            <el-button type="text">Sign Up</el-button>
          </el-menu-item>
          <el-menu-item index="/auth/join" class="menu-item" v-if="isAuth" @click.prevent="logout">Logout</el-menu-item>
          <el-menu-item index="/backoffice" class="menu-item" v-if="isAuth">
            <el-button type="text">Backoffice</el-button>
          </el-menu-item>
        </el-menu>
        <!--<ul class="menu_submenu">-->
          <!--<li class="menu_submenu-item">-->
            <!--<nuxt-link target="_self" to="/#enq" @click.native="scrollTo('enq')">What is-->
              <!--ENQ-->
            <!--</nuxt-link>-->
          <!--</li>-->
          <!--<li class="menu_submenu-item">-->
            <!--<nuxt-link target="_self" to="/#mining" @click.native="scrollTo('mining')">Phone-->
              <!--mining-->
            <!--</nuxt-link>-->
          <!--</li>-->
          <!--<li class="menu_submenu-item">-->
            <!--<nuxt-link target="_self" to="/#world"-->
                       <!--@click.native="scrollTo('world')">Changing the world-->
            <!--</nuxt-link>-->
          <!--</li>-->
          <!--<li class="menu_submenu-item">-->
            <!--<nuxt-link target="_self" to="/#roadmap"-->
                       <!--@click.native="scrollTo('roadmap')">Roadmap-->
            <!--</nuxt-link>-->
          <!--</li>-->
          <!--<li class="menu_submenu-item">-->
            <!--<nuxt-link target="_self" to="/#partners"-->
                       <!--@click.native="scrollTo('partners')">Partners-->
            <!--</nuxt-link>-->
          <!--</li>-->
        <!--</ul>-->
      </div>
      <el-menu :default-active="activeMenu" mode="horizontal" router class="menu-left">
        <!--<button class="menu_logo menu_logo-hamburger" @click="openMenu"><i class="fa fa-bars" aria-hidden="true"></i>-->
        <!--</button>-->
        <nuxt-link to="/" class="menu_logo">
          <img :src="isfixedcolor==='false' ? '/img/logo.svg' : '/img/logo-white.png'" alt="" class="menu_logo-img">
        </nuxt-link>
        <!--<el-menu-item index="/" class="menu-item">Home</el-menu-item>-->
        <!--<el-menu-item index="/team" class="menu-item">Team</el-menu-item>-->
        <!--<el-menu-item index="" class="menu-item"><a href="https://medium.com/@EnqBlockchain" target="_blank">Blog</a>-->
        <!--</el-menu-item>-->
        <!--<el-menu-item index="/calendar" class="menu-item">Calendar</el-menu-item>-->
        <!--<el-menu-item index="/video" class="menu-item">Video</el-menu-item>-->
        <!--<el-menu-item index="/press" class="menu-item">Press</el-menu-item>-->
        <!--<el-menu-item index="/token" class="menu-item">Token</el-menu-item>-->
        <!--<el-menu-item index="/faq" class="menu-item">FAQ</el-menu-item>-->
      </el-menu>
      <ul class="el-menu--horizontal el-menu menu-right text-right" v-if="loadingFingerEnd || checkingAuth">
        <fingerLoader @onEnd="loadingFingerEnd=false"></fingerLoader>
      </ul>
      <ul class="el-menu--horizontal el-menu menu-right" v-else>
        <div class="special-a-wrapper">
          <nuxt-link to="/privatesale" class="special-a">
            <button class="button-link orange">Private Sale</button>
          </nuxt-link>
          <a href="/app/backoffice" class="special-a">
            <button class="button-link orange">airdrop</button>
          </a>
        </div>
        <nuxt-link to="/auth/login" class="el-menu-item menu-item float-right" v-if="!isAuth">
          <el-button type="text">Sign In</el-button>
        </nuxt-link>
        <nuxt-link to="/auth/join" class="el-menu-item menu-item float-right" v-if="!isAuth">
          <el-button type="text">Sign Up</el-button>
        </nuxt-link>
        <li class="el-menu-item float-right menu-item" v-if="isAuth" @click.prevent="logout">Logout</li>
        <nuxt-link to="/backoffice" class="el-menu-item menu-item float-right" v-if="isAuth">
          <el-button type="text">Backoffice</el-button>
        </nuxt-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import socket from '~/plugins/socket.io.js';
  import fingerLoader from '@/components/authorize/loader';

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
        isfixedcolor: 'false',
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
        if (!document.getElementById(to)) return false;
        Math.easeInOutQuad = function (t, b, c, d) {
          t /= d / 2;
          if (t < 1) return c / 2 * t * t + b;
          t--;
          return -c / 2 * (t * (t - 2) - 1) + b;
        };
        to = window.scrollY + document.getElementById(to).getBoundingClientRect().top;
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
  $color-header: #ffffff;
  .menu {
    position: relative;
    background-color: $color-header;
    border-bottom: 0px;
    &-item {
      height: 80px;
      line-height: 80px;
      font-size: 20px;
      button {
        font-size: 20px;
      }
      &.is-active {
        border-color: transparent;
      }
      a {
        display: block;
      }
    }
    &-left {
      flex-grow: 1;
      z-index: 1;
      border-bottom: transparent;
      background-color: $color-header;
      padding-left: 54px;
    }
    &-right {
      flex-grow: 1;
      z-index: 1;
      border-bottom: transparent;
      background-color: $color-header;
      padding-right: 54px;
      .special-a {
        top: 65px;
        right: 110px;
        z-index: 1;
        .orange {
          width: 255px;
          padding: 5px 15px;
        }
        &-wrapper {
          display: flex;
          position: absolute;
          top: 65px;
          right: 50px;
          a {
            padding-right: 10px;
          }
        }
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
      &-overlay {
      }
    }
    &-wrapper {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      z-index: 1000;
      background-color: $color-header;
      & + .container {
        padding-top: 85px;
      }
      &.true {
        .menu-left, .menu-right {
          background-color: rgba(0, 159, 202, 1);
          .el-menu-item,
          .el-button--text {
            color: #ffffff;
          }
        }
      }
    }
    &_submenu {
      &-wrapper {
        height: 100%;
        overflow-y: scroll;
        position: fixed;
        left: 0px;
        top: 0px;
        padding: 0px;
        width: 400px;
        z-index: 3;
        text-align: right;
        flex-direction: column;
        animation: slideInLeft .2s both;
        background-color: #bebebe;
      }
      &-item {
        text-align: center;
        padding: 10px 0px;
        font-size: 22px;
        a {
          color: rgba(0, 0, 0, .7);
        }
      }
    }
    &_logo {
      &-hamburger {
        display: block;
        width: 100px;
        font-size: 31px;
        padding: 5px;
        background-color: transparent;
        color: #646464;
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
        z-index: 3;
      }
    }
    &-open {
      display: flex;
      animation: slideInRight .3s both;
      box-shadow: -4px 0px 30px -15px rgb(90, 90, 90);
    }
    @media screen and (max-width: 1440px) {
      &_logo {
        margin-right: 20px;
      }
      &-item {
        font-size: 16px;
        button {
          font-size: 16px;
          min-width: auto;
        }
      }
      &-left {
        padding-left: 24px;
      }
      &-right {
        padding-right: 24px;
        display: flex;
        .special-a {
          right: auto;
          left: 10px;
          .orange {
            font-size: 14px;
            width: 150px;
          }
        }
      }
    }
    @media screen and (max-width: 1080px) {
      &-left {
        padding-left: 0px;
      }
      &-right {
        padding-right: 0px;
        .orange-a {
          display: none;
        }
      }
    }
    @media screen and (max-width: 991px) {
      &_submenu {
        display: none;
        &-wrapper {
          width: 300px;
          &.menu-open {
            .menu-item {
              display: block;
              text-align: center;
            }
          }
        }
      }
      &-item {
        display: none;
      }
      &-right {
        display: none;
      }
    }
    @media screen and (min-width: 991px) {
      &_mobile {
        display: none;
      }
    }
    @media screen and (max-width: 768px) {
      .special-a {
        width: 100%;
        button {
          width: 100%;
          margin-bottom: 10px;
        }
      }
    }
  }

  .float-right {
    float: right;
  }

  @keyframes slideInRight {
    0% {
      transform: translateX(-100%);
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
      transform: translateX(-100%);
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
