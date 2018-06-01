<template>
  <section class="container">
    <h1 class="text-center page-title">{{press.title}}</h1>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="20" :md="22" :xl="16">
        <el-row>
          <el-tabs v-model="activeLang" class="enq-tabs events-tabs" @tab-click="changeLang">
            <el-tab-pane v-for="(lang, lkey) in press.availablesLang" :key="lkey" :label="lang.label"
                         :name="lang.name"></el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row>
          <el-tabs v-model="activeTab" class="enq-tabs events-tabs">
            <el-tab-pane v-for="(month, mkey) in press.months" :key="mkey" :label="month" :name="month">
              <el-row :gutter="30" class="flex-start flex-wrap">
                <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(article, key) in press.articles"
                        :key="key"
                        v-show="article.date.search(month)>-1">
                  <art :article="article" :read="press.read">
                  </art>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import art from '@/components/press/article';
  import axios from 'axios';

  function pressMiddleware(data, lang = 'articlesEN') {
    let monthArray = [];
    let articlesArray = [];
    data[lang].forEach(item => {
      let splittedDate = item.date.split(' ');
      let article = {
        date: item.date,
        title: item.title,
        description: item.description,
        link: item.link
      };
      articlesArray.push(article);
      monthArray.push(splittedDate[0]);
    });

    return {
      title: data.title,
      read: data.read,
      presskitIMG: data.presskitIMG,
      presskitDOC: data.presskitDOC,
      availablesLang: data.availablesLang,
      articles: articlesArray,
      months: [...new Set(monthArray)],
    }
  }


  export default {
    name: "press",
    data() {
      return {
        activeLang: 'EN',
        activeTab: ''
      }
    },
    components: {
      art
    },
    methods: {
      changeLang() {
        axios.get('/i18n/press_' + 'en' + '.json').then(res => {
          this.press = pressMiddleware(res.data.press, 'articles' + this.activeLang);
          this.activeTab = this.press.months[this.press.months.length - 1];
        });
      }
    },
    mounted() {
      this.activeTab = this.press.months[this.press.months.length - 1];
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/press_' + 'en' + '.json');
      let pr = pressMiddleware(data.press);
      return {press: pr}
    }
  }
</script>
