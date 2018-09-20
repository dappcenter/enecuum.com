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
        <el-row>
          <el-col :xs="24" :sm="12">
            <el-form class="subscribe" :model="whitelist" :rules="rules" ref="whiteListForm"
                     @submit.native.prevent="submitWL">
              <div class="subscribe_text">
                {{data.subscribeForm.description}}
              </div>
              <div class="subscribe_footer">
                <el-form-item prop="email" class="subscribe_footer-item">
                  <el-input type="email" name="email" v-model="whitelist.email"
                            :placeholder="data.subscribeForm.input" class="input"></el-input>
                </el-form-item>
                <el-button type="primary" @click="submitWL" class="join" :loading="loading">
                  {{data.subscribeForm.button}}
                </el-button>
              </div>
            </el-form>
          </el-col>
        </el-row>
        <vue-recaptcha size="invisible" :sitekey="recaptchaKey" @verify="onVerify"
                       ref="invisibleRecaptcha"></vue-recaptcha>
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
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "banner",
    props: ['data'],
    data() {
      return {
        loading: false,
        whitelist: {
          email: ''
        },
        rules: {
          email: [
            {
              required: true,
              message: 'Email is required'
            }
          ]
        },
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
    components: {
      'vue-recaptcha': VueRecaptcha
    },
    computed: {
      social() {
        return this.$store.state.social;
      },
      recaptchaKey() {
        return require('@/config/config.json').recaptchaKey;
      }
    },
    methods: {
      onVerify(response) {
        console.log(response);
        this.sendWhitelist(response);
      },
      submitWL() {
        this.$refs['whiteListForm'].validate((valid) => {
          if (valid) {
            this.$refs.invisibleRecaptcha.execute();
          } else {
            return false;
          }
        });
      },
      sendWhitelist(captcha) {
        let data = this.whitelist;
        data.recaptcha = captcha;
        this.loading = true;
        let isSended = this.$store.dispatch('subscribeWP', data);
        isSended.then((res) => {
          if ('success') {
            this.a({category: 'subscribe', eventAction: 'send', eventLabel: 'subscribe'});
            this.$notify({
              title: 'Success',
              message: res.success,
              type: 'success',
              position: 'bottom-left'
            });
            this.$refs['whiteListForm'].resetFields();
          } else {
            this.$notify({
              title: 'Error',
              message: res.error,
              type: 'error',
              position: 'bottom-left'
            });
          }
          this.loading = false;
          this.$refs.invisibleRecaptcha.reset();
        }).catch(() => {
          this.$notify({
            title: 'Error',
            message: "Something went wrong, sorry",
            type: 'error',
            position: 'bottom-left'
          });
          this.loading = false;
        });
      }
    }
  }
</script>
