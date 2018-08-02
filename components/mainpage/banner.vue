<template>
  <el-row class="row banner blue-background" id="enq">
    <div class="banner_img-wrapper">
      <el-carousel :interval="5000" arrow="never" indicator-position="none" height="100%">
        <el-carousel-item v-for="item in 2" :key="item">
          <img :src="'/img/mainpage/banner/face-'+item+'.png'" alt="" class="banner_img">
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="banner_content">
      <h1 class="banner_title">
        {{data.title}}
      </h1>
      <div class="banner_text">
        <div>
          {{data.subtitle}}
        </div>
      </div>
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
          <el-button type="primary" @click="submitWL" class="join" :loading="loading">{{data.subscribeForm.button}}
          </el-button>
        </div>
      </el-form>
      <div class="banner_networks">
        <a v-for="(item, key) in social" :key="key" :href="item.link" target="_blank"
           @click="a({category: 'social', eventAction: 'click', eventLabel: item.type})">
          <img :src="item.img" alt="">
        </a>
      </div>
      <vue-recaptcha size="invisible" :sitekey="recaptchaKey" @verify="onVerify"
                     ref="invisibleRecaptcha"></vue-recaptcha>
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
        }
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
          if (res.ok) {
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
