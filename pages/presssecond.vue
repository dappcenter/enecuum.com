<template>
  <section class="container">
    <h1 class="text-center page-title">{{press.title}}</h1>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="20" :md="22" :xl="16">
        <el-row>
          <el-tabs v-model="activeLang" class="enq-tabs events-tabs" @tab-click="changeLang">
            <el-tab-pane v-for="(lang, lkey) in press.availablesLang" :key="lkey" :label="lang"
                         :name="lang"></el-tab-pane>
          </el-tabs>
        </el-row>
        <el-row>
          <el-tabs v-model="activeTab" class="enq-tabs events-tabs">
            <el-tab-pane v-for="(month, mkey) in press.months" :key="mkey" :label="month" :name="month">
              <el-row :gutter="30" class="flex-start flex-wrap">

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

  function pressMiddleware(data, lang = 'articles_EN') {
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
      articles: articlesArray,
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
      art
    },
    methods: {
      changeLang() {
        axios.get('/i18n/press_second_' + 'en' + '.json').then(res => {
          this.press = pressMiddleware(res.data.press, 'articles_' + this.activeLang);
          this.activeTab = this.press.months[this.press.months.length - 1];
        });
      }
    },
    mounted() {
      this.activeTab = this.press.months[this.press.months.length - 1];
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/press_second_' + 'en' + '.json');
      let pr = pressMiddleware(data.press);
      return {press: pr}
    }
  }
</script>
<style lang="scss">
  .press {
    position: relative;
    &.bigblock {
      display: none;
      .press {
        &_info {
          bottom: 60px;
          left: 60px;
          color: #ffffff;
          &-title {
            font-size: 40px;
            margin-bottom: 0px;
          }
          &-description {
            font-size: 16px;
            padding: 7px 0px
          }
          &-date {
            color: rgba(255, 255, 255, .7);
            font-size: 12px;
            padding: 7px 0px;
          }
        }
      }
    }
    &.middleblock {
      display: none;
      .press {
        &_info {
          bottom: 20px;
          left: 20px;
          color: #ffffff;
          max-width: 100%;
          &-title {
            font-size: 20px;
            margin-bottom: 0px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &-description {
            font-size: 14px;
            padding: 2px 0px
          }
          &-date {
            color: rgba(255, 255, 255, .7);
            font-size: 10px;
            padding: 2px 0px;
          }
        }
      }
    }
    &.smallblock {
      &.press {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .press {
        &_info {
          position: relative;
          max-width: 100%;
          &-title {
            font-size: 18px;
            font-weight: bold;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &-description {
            font-size: 12px;
            padding: 4px 0px;
            color: #bbbbbb;
          }
          &-date {
            color: rgba(1, 1, 1, 0.4);
            font-size: 10px;
            font-weight: bold;
            padding: 4px 0px;
          }
          &-read {
            text-transform: uppercase;
            color: #00add3;
            font-weight: bold;
          }
        }
      }
    }
    &_info {
      position: absolute;
    }
  }
</style>
