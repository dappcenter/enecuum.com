<template>
  <div class="bgback">
    <div class="airdrop_container">
      <h2 class="airdrop-title title line-bottom">
        Open <b>Tommorow</b> Now
      </h2>
      <div class="airdrop-title description">
        Enecuum is the world's first blockchain to unite millions of connected devices into a single network. With more
        and more devices connected to this network, the higher the speed with no cap on scalability.
        <br>
        Very soon we will launch our application for smartphones, which will make it possible to earn tokens. Just
        imagine, you will be able to receive a reward while you are sleeping! Do you want to receive benefits as device
        owner? All you need to do is download our App !
      </div>
      <div class="enq-video">
        <iframe src="https://www.youtube.com/embed/GpPAfyFqbAE" frameborder="0" style="width: 100%; height: 360px;"
                allow="autoplay; encrypted-media" allowfullscreen></iframe>
      </div>
      <div class="airdrop-title description">
        By completing the tasks of Enecuum airdrop program, you get rewarded with the points which will be exchanged for
        ENQ tokens at a one-to-one exchange rate after Enecuum airdrop is over.
        <br>
        In order to get the tokens, you will need to pass the verification on our website. Please make sure to fill in
        the requested information correctly.
      </div>
      <el-row>
        <el-col :xs="24">
          <div class="input_group-wrapper">
            <div class="input_group checkbox flex-start">
              <label class="input_group-checkbox">
                I understand I may need to take additional steps in order to be eligible to receive tokens
                <input type="checkbox" v-model="checkTerms" @change="checkMark">
                <span class="checkmark"></span>
              </label>
            </div>
          </div>
        </el-col>
      </el-row>
      <div :class="!checkTerms? 'blockedOverlay': ''">
        <div class="airdrop-title-wrapper">
          <h1 class="airdrop-title-back">
            Perform
          </h1>
          <h2 class="airdrop-title title line-bottom">
            Perform simple tasks below <b>and get points</b> for it
          </h2>
        </div>
        <el-row class="airdrop_tasks">
          <el-col :xs="12" :sm="8" class="task-wrapper" v-for="(item, key) in tasks" :key="key">
            <div class="task" :class="mainuser[item.type] ? 'done' : null"
                 @click="authSocial(item.type, mainuser[item.type])" :title="'Check'">
              <div class="task-checkbox"></div>
              <div class="task-symbol"><img :src="item.img" alt=""></div>
              <div class="task-cost">+ {{item.price}} <span class="allotted">ENQ</span></div>
            </div>
          </el-col>
        </el-row>
        <div class="airdrop_cubeimg">
          <img src="/img/airdrop/cube.png" alt="">
        </div>
        <el-row class="airdrop_form">
          <el-col :xs="24" :sm="16">
            <div class="input_group pure">
              <label for="kycname">Name:</label>
              <input type="text" id="kycname" v-model="userdata.name" :disabled="mainuser.kyc">
            </div>
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="input_group pure">
              <label>Nationality - combo choice (including any dual-nationality):</label>
              <select v-model="userdata.nation" placeholder="Nationality" :disabled="mainuser.kyc">
                <option selected disabled>Country of citizenship</option>
                <option v-for="(item, key) in countries" :value="item.name" :key="key">{{item.name}}</option>
              </select>
            </div>
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="input_group pure">
              <label for="birthDate">Date of birth:</label>
              <input type="date" id="birthDate" v-model="userdata.birthDate" :disabled="mainuser.kyc">
            </div>
          </el-col>
          <el-col :xs="24" :sm="16" v-if="!mainuser.kyc">
            <div class="input_group pure">
              <label for="file">Scan or photo of your passport: <label for="file" class="upload">upload
                form</label><input
                type="file"
                id="file"
                accept="image/*"
                @change="loadFile"></label>
              <input type="text" class="inputfile" disabled v-model="file.name">
            </div>
          </el-col>
          <el-col :xs="24" :sm="16">
            <div class="input_group pure">
              <label for="walletInfo">Digital wallet information </label>
              <input type="text" id="walletInfo" v-model="userdata.walletInfo" :disabled="mainuser.kyc">
            </div>
          </el-col>
          <el-col :xs="24" :sm="16" v-if="!mainuser.kyc">
            <div class="subscr"> IMPORTANT: Do not enter an exchange wallet address from Coinbase, Bittrex, Binance, or
              any other. You need a personal address where you control the private keys! If you do not have a wallet,
              you can register it, for example, on myetherwallet.com
            </div>
          </el-col>
          <el-col :xs="24" :sm="16" v-if="!mainuser.kyc">
            <div class="input_group-wrapper">
              <div class="input_group button flex-start">
                <button @click="submit">Submit</button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      title="Rules"
      :visible.sync="rulesVisible"
      width="40%">
      <div>
        <ul class="airdrop_rules">
          <li v-for="(item, key) in airdropData[activeRule]" :key="key" v-html="item"></li>
        </ul>
        <div v-if="activeRule==='telegram'">
          <div id="telegramAuth" style="text-align:center;"></div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <a href="https://twitter.com/ENQ_enecuum" target="_blank" style="padding-right: 10px;"
           v-if="activeRule==='twitter'">
          <el-button type="primary">Follow Twitter</el-button>
        </a>
        <a href="https://t.me/Enecuum_EN" target="_blank" style="padding-right: 10px;"
           v-if="activeRule==='telegram'">
          <el-button type="primary">Join Telegram</el-button>
        </a>
        <el-button type="primary" @click="checkRule(activeRule)" v-if="activeRule!=='telegram' && activeRule!=='uniq'">
          OK
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import socket from '~/plugins/socket.io.js';

  export default {
    name: "aidrop_page",
    layout: 'airdrop',
    middleware: 'airdropAuth',
    data() {
      return {
        rulesVisible: false,
        activeRule: '',
        countries: [],
        airdropData: {
          facebook: ['You must have at least 300 friends. If you have been rejected due to less than 300 friends, do not resent your application with updated followers list. The application will be denied.', 'You have to be a follower of official Enecuum facebook page (<a href="https://www.facebook.com/enecuum.EN/" target="_blank">https://www.facebook.com/enecuum.EN/</a>)', 'Facebook friends count will not be updated after your registration', 'You have to make at least 1 original post (with your own content) and 1 repost per campaign.'],
          twitter: ['You must have at least 150 followers. If you have been rejected due to less than 150 followers, do not resent your application with updated followers list. The application will be denied', 'You have to be a follower of official Enecuum Twitter', 'You have to make at least 2 original tweets (with your own content) and 2 retweets per campaign', 'You must use our hashtags: #Enecuum #ENQ #mobilemining in original tweets'],
          telegram: ['Follow Enecuum <a href="https://t.me/Enecuum_EN" target="_blank">Telegram</a> group to get a reward', 'Quitting during the ongoing airdrop is restricted. If you quit the channel before the campaign is over, your reward will be annulled'],
          uniq: ['Your content (article or video) must be original and contain at least 300 words (2 min)', 'Your article (video) may be in other language than English but please write that in your application. Your article must have the following links: Enecuum website (<a href="https://enecuum.com/">https://enecuum.com//<a>) ', 'Enecuum Telegram (<a href="https://t.me/Enecuum_EN" target="_blank">https://t.me/Enecuum_EN</a>) Your article may be posted on Facebook, Medium, LinkedIn, Youtube.', 'Promote your article (video) in other forums like Facebook, Twitter or LinkedIn or other with a large outreach (more than 250 followers) *', 'Send link to the article to the Enecuum Telegram (<a href="https://t.me/Enecuum_EN" target="_blank" ">https://t.me/Enecuum_EN</a>)', 'Send the link on your Article  to <a href="mailto:airdrop@enecuum.com">airdrop@enecuum.com</a>'],
          emailpro: ['Leave your application (email) to participate in Airdrop']
        },
        file: {},
        userdata: {
          name: '',
          nation: '',
          birthDate: '',
          walletInfo: ''
        },
        checkTerms: false,
        tasks: [{
          type: 'emailpro',
          img: '/img/airdrop/email.png',
          price: 25
        }, {
          type: 'telegram',
          img: '/img/airdrop/0x74656c656772616d.png',
          price: 40
        }, {
          type: 'twitter',
          img: '/img/airdrop/0x74776974746572.png',
          price: 20
        }, /* {
          type: 'facebook',
          img: '/img/airdrop/0x66616365626f6f6b.png',
          price: 20
        },*/ {
          type: 'uniq',
          img: '/img/airdrop/uniq.png',
          price: 5000
        }]
      }
    },
    computed: {
      mainuser() {
        let user = this.$store.state.airdropUser;
        this.userdata.name = user.name + ' ' + user.surname;
        return user;
      }
    },
    methods: {
      getRules(type) {
      },
      checkMark() {
        localStorage.setItem('checkterms', this.checkTerms);
      },
      initTelegramBtn() {
        setTimeout(() => {
          if (!document.getElementById('telegramAuth')) return false;
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://telegram.org/js/telegram-widget.js?3';
          script.setAttribute('data-size', this.size || 'medium');
          script.setAttribute('data-userpic', this.userpic || false);
          script.setAttribute('data-telegram-login', this.telegramLogin || 'testgroupenq_bot');
          script.setAttribute('data-request-access', this.requestAccess || 'read');
          if (this.radius) {
            script.setAttribute('data-radius', '4')
          }
          window.onTelegramAuth = this.onTelegramAuth;
          script.setAttribute('data-onauth', 'window.onTelegramAuth(user)');
          document.getElementById('telegramAuth').appendChild(script)
        }, 1000);
      },
      onTelegramAuth(user) {
        axios.request({
          url: '/oauth/telegram',
          data: {
            id: user.id
          },
          method: 'post',
          withCredentials: true,
        }).then((res) => {
          if (res.data.ok) {
            this.getInfo('telegram', res.data.ok);
          } else {
            this.$notify({
              message: 'Check rules',
              type: 'error',
              position: 'bottom-left'
            });
          }
        });
      },
      checkRule(type) {
        window.open("/oauth/" + type, "", "width=500,height=300");
        this.$notify({
          message: 'Checking your account',
          type: 'success',
          position: 'bottom-left'
        });
        this.rulesVisible = false;
      },
      authSocial(type, done) {
        if (done) return false;
        this.initTelegramBtn();
        this.rulesVisible = true;
        this.activeRule = type;
      },
      submit() {
        if (!this.file || !this.userdata.name || !this.userdata.nation || !this.userdata.birthDate || !this.userdata.walletInfo) {
          this.$notify({
            message: 'Some fields are empty',
            type: 'warning',
            position: 'bottom-left'
          });
          return false;
        }
        const data = new FormData();
        data.append('file', this.file);
        data.append('name', this.userdata.name);
        data.append('nation', this.userdata.nation);
        data.append('birthDate', this.userdata.birthDate);
        data.append('walletInfo', this.userdata.walletInfo);
        data.append('email', this.$store.state.airdropUser.email);
        let save = this.$store.dispatch('airdropLiteKyc', data);
        save.then(res => {
          if (res.ok) {
            this.$notify({
              message: 'Thank you!',
              type: 'success',
              position: 'bottom-left'
            });
            this.$store.state.airdropUser.kyc = true;
          } else {
            this.$notify({
              message: res.message,
              type: 'error',
              position: 'bottom-left'
            });
          }
        });
      },
      loadFile(e) {
        this.file = e.target.files[0];
      },
      getInfo(provider, data) {
        console.log('starting get info: ', provider, data);
        if (!provider) return false;
        axios.request({
          url: '/api/airdrop/update',
          data: {
            t: provider,
            f: data
          },
          method: 'post',
          withCredentials: true,
        }).then((res) => {
          if (res.data.ok) {
            this.$store.state.airdropUser[provider] = true;
            this.$store.state.airdropUser.total = res.data.total;
            this.$notify({
              message: 'Awesome! Your balance is ' + res.data.total + 'ENQ',
              type: 'success',
              position: 'bottom-left'
            });
          } else {
            this.$notify({
              message: 'Check rules',
              type: 'info',
              position: 'bottom-left'
            });
          }
        });
      }
    },
    mounted() {
      if (localStorage.getItem('checkterms')) {
        this.checkTerms = localStorage.getItem('checkterms');
      }
      this.user = this.$store.state.airdropUser;
      let airdropKyc = this.$store.dispatch('getAirdropKyc');
      airdropKyc.then(res => {
        if (res.ok) {
          this.userdata = res.message;
        }
      });
      socket.on('twitter', (data) => {
        if (!data || typeof(data) === 'object') {
          this.$notify({
            message: 'Check rules',
            type: 'info',
            position: 'bottom-left'
          });
        } else {
          this.getInfo('twitter', data);
        }
      });
      socket.on('facebook', (data) => {
        console.log('from io facebook: ', data);
        if (!data || typeof(data) === 'object') {
          this.$notify({
            message: 'Check rules',
            type: 'info',
            position: 'bottom-left'
          });
        } else {
          this.getInfo('facebook', data);
        }
      });
      socket.on('connectServer', (data) => {
        if (!data) return false;
      });
      axios.get('/i18n/countries.json').then(res => {
        this.countries = res.data;
      });
    }
  }
</script>
