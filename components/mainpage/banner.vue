<template>
  <el-row class="row banner">
    <h1 class="banner_title">
      {{data.title}}
    </h1>
    <div class="banner_text">
      <div>
        {{data.subtitle}}
      </div>
    </div>
    <div><a href="docs/Enecuum_WP.pdf" class="enq-button enq-button--blue" target="_blank" @click="a({category: 'docs', eventAction: 'open', eventLabel: 'whitepaper'})">
      {{data.wp}}
    </a>
      <a href="docs/Enecuum_WP_KO.docx" class="enq-button enq-button--blue" target="_blank" @click="a({category: 'docs', eventAction: 'open', eventLabel: 'whitepaper_ko'})">
        {{data.wp_ko}}
      </a><a href="docs/Onepager.pdf" class="enq-button enq-button--plain" target="_blank" @click="a({category: 'docs', eventAction: 'open', eventLabel: 'onepager'})">
        {{data.onepager}}
      </a></div>
    <div class="banner_networks">
      <a v-for="(item, key) in social" :key="key" :href="item.link" target="_blank" @click="a({category: 'social', eventAction: 'click', eventLabel: item.type})">
        <img :src="item.img" alt="">
      </a>
    </div>
    <el-form class="subscribe" :model="whitelist" :rules="rules" ref="whiteListForm">
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
  </el-row>
</template>

<script>
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
    computed: {
      social() {
        return this.$store.state.social;
      }
    },
    methods: {
      submitWL() {
        this.$refs['whiteListForm'].validate((valid) => {
          if (valid) {
            this.sendWhitelist();
          } else {
            console.log('error submit');
            return false;
          }
        });
      },
      sendWhitelist() {
        let data = this.whitelist;
        if (this.cq_user) {
          data.append('cq_user', this.cq_user);
        }
        this.loading = true;
        let isSended = this.$store.dispatch('subscribeWP', data);
        isSended.then((res) => {
          console.log(res);
          if (res.ok) {
            this.a({category: 'subscribe', eventAction: 'send', eventLabel: 'subscribe'});
            this.$message({
              type: "success",
              message: res.success
            });
            this.$refs['whiteListForm'].resetFields();
          } else {
            this.$message({
              type: "error",
              message: res.error
            });
          }
          this.loading = false;
        }).catch(() => {
          this.$message({
            type: "error",
            message: "Something went wrong, sorry"
          });
          this.loading = false;
        });
      }
    }
  }
</script>
