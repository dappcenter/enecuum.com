<template>
  <section class="container">
    <h1 class="text-center page-title">{{press.title}}</h1>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="20" :md="22" :xl="16">
        <el-row>
          <el-tabs v-model="activeLang" class="enq-tabs events-tabs" @tab-click="changeLang">
            <el-tab-pane v-if="press.availablesLang.length>1" v-for="(lang, lkey) in press.availablesLang" :key="lkey"
                         :label="lang"
                         :name="lang"></el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row :gutter="30" class="flex-start flex-wrap events-press">
          <el-col v-for="(article, akey) in press.articles" :key="akey" :xs="22"
                  :sm="article.level ? article.level===3 ? 24 : 8 : 12">
            <bigban v-if="article.level===3" :article="article"></bigban>
            <midban v-if="article.level===2" :article="article"></midban>
            <smallban v-if="!article.level" :article="article" :read="press.read"></smallban>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import art from '@/components/press/article';
  import bigban from '@/components/press/bigbanner';
  import midban from '@/components/press/middlebanner';
  import smallban from '@/components/press/smallbanner';

  import axios from 'axios';

  function pressMiddleware(data, lang = 'articles_EN') {
    let monthArray = [];
    let articlesArray = [];
    let notLevelArticlesArray = [];
    data[lang].forEach(item => {
      let splittedDate = item.date.split(' ');
      let article = {
        date: item.date,
        title: item.title,
        description: item.description,
        link: item.link,
        level: item.level || 0,
        img: item.img || ''
      };
      article.level === 0 ? notLevelArticlesArray.push(article) : articlesArray.push(article);

      monthArray.push(splittedDate[0]);
    });
    articlesArray.sort((a, b) => {
      if (a.level < b.level) {
        return 1;
      }
      if (a.level > b.level) {
        return -1;
      }
    });
    notLevelArticlesArray.sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) {
        return 1;
      } else {
        return -1;
      }
    });
    let availableLang = [];
    for (let ln in data) {
      ln.split('_').length > 1 ? availableLang.push(ln.split('_')[1]) : null;
    }
    return {
      title: data.title,
      read: data.read,
      presskitIMG: data.presskitIMG,
      presskitDOC: data.presskitDOC,
      availablesLang: availableLang,
      articles: [...articlesArray, ...notLevelArticlesArray],
      months: [...new Set(monthArray)],
    }
  }


  export default {
    name: "presssecond",
    data() {
      return {
        activeLang: 'EN',
        activeTab: ''
      }
    },
    components: {
      art,
      bigban,
      midban,
      smallban
    },
    methods: {
      changeLang() {
        axios.get('/i18n/press_' + 'en' + '.json').then(res => {
          this.press = pressMiddleware(res.data.press, 'articles_' + this.activeLang);
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
