<template>
  <el-row class="row banner" id="enq">
    <img src="/img/mainpage/banner/01_Blockchain-of-tomorrow.jpg" alt="">
  </el-row>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "banner",
    props: ['data'],
    data() {
      return {
        counter: 2,
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
    },
    mounted() {
      if (window.innerWidth <= 768) {
        this.counter = 1;
      }
    }
  }
</script>
