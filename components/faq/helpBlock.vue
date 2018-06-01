<template>
  <el-collapse v-model="activeTab" accordion class="enq-collapse">
    <el-collapse-item v-for="(item, key) in data" :key="key" :title="item.title" :name="item.title" class="mt-14"
                      :id="item.title">
      <div class="faq-tabs_content">
        <p v-html="item.text"></p>
        <p class="faq-social">
          <a href="" class="faq-social-link" @click.prevent="facebook(item)"><i class="fa fa-facebook" aria-hidden="true"></i></a>
          <a href="" class="faq-social-link" @click.prevent="twit(item)"><i class="fa fa-twitter" aria-hidden="true"></i></a>
          <a href="" class="faq-social-link" @click.prevent="linkedin(item)"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
          <a href="#" class="faq-social-share text-link" @click.prevent="copy">Share this answer</a>
        </p>
      </div>
      <contribute></contribute>
      <useful></useful>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import contribute from './contribute';
  import useful from './useful';

  export default {
    name: "help-block",
    props: {
      data: Array,
      activeOutterTab: String
    },
    components: {
      contribute,
      useful
    },
    data() {
      return {
        activeTab: ''
      }
    },
    watch: {
      'activeOutterTab': function () {
        if (this.activeOutterTab !== '0') {
          this.activeTab = this.activeOutterTab;
        }
      }
    },
    methods: {
      copy() {
        this.$emit('copy', this.activeTab)
      },
      facebook(item) {
        this.$emit('shared', {type: 'facebook', item: item});
      },
      twit(item) {
        this.$emit('shared', {type: 'twitter', item: item});
      },
      linkedin(item) {
        this.$emit('shared', {type: 'linkedin', item: item});
      }
    }
  }
</script>
