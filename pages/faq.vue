<template>
  <section class="container faq">
    <h1 class="text-center page-title">FAQ</h1>
    <el-row class="flex-center faq_search-wrapper">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <el-row class="flex-center flex-wrap" :gutter="20">
          <el-col :xs="22" :sm="18">
            <el-autocomplete placeholder="Start typing your question" clearable
                             class="border-off-inputs faq_search-input"
                             v-model="searchFaq"
                             @select="selectQuery"
                             :trigger-on-focus="false"
                             :fetch-suggestions="querySearchAsync">
              <template slot-scope="{ item }">
                <div class="faq_search-input-wrapper">
                  <div class="faq_search-input-title">{{ item.value }}</div>
                  <div class="faq_search-input-text">{{ cutText(item.text) }}</div>
                </div>
              </template>
            </el-autocomplete>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <el-row class="flex-between" v-for="(item, key) in faq.main" :key="key">
          <el-tabs v-model="activeTab[key].title" class="enq-tabs faq-tabs">
            <el-tab-pane v-for="(block, ikey) in item" :key="ikey" :label="block.title" :name="block.title">
              <helpBlock :data="block.content" :activeOutterTab="activeCollapse" @copy="copyToBuffer"
                         @shared="shared"></helpBlock>
            </el-tab-pane>
          </el-tabs>
        </el-row>
      </el-col>
    </el-row>
    <div class="divider"></div>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <p class="text-center"><b>This FAQ is very helpful, but what if I have more questions?​​</b></p>
      </el-col>
    </el-row>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <p class="text-center">If you have any more questions, please email our support at <br> <a
          href="mailto:support@enecuum.com">support@enecuum.com</a></p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import axios from 'axios';
  import helpBlock from '@/components/faq/helpBlock';

  export default {
    name: "faq",
    data() {
      return {
        activeTab: [{
          title: '',
          tabs: [],
          contentTitles: []
        }, {
          title: '',
          tabs: [],
          contentTitles: []
        }],
        activeCollapse: '0',
        searchFaq: '',
        popup: {
          status: false,
          resizable: true,
          toolbar: false,
          menubar: false,
          scrollbars: false,
          location: false,
          directories: false,
          width: 626,
          height: 436,
          top: 0,
          left: 0,
          window: undefined,
          interval: null
        }
      }
    },
    components: {
      helpBlock
    },
    methods: {
      share(url) {
        window.open(
          url,
          'sharer',
          'status=' + (this.popup.status ? 'yes' : 'no') +
          ',height=' + this.popup.height +
          ',width=' + this.popup.width +
          ',resizable=' + (this.popup.resizable ? 'yes' : 'no') +
          ',left=' + this.popup.left +
          ',top=' + this.popup.top +
          ',screenX=' + this.popup.left +
          ',screenY=' + this.popup.top +
          ',toolbar=' + (this.popup.toolbar ? 'yes' : 'no') +
          ',menubar=' + (this.popup.menubar ? 'yes' : 'no') +
          ',scrollbars=' + (this.popup.scrollbars ? 'yes' : 'no') +
          ',location=' + (this.popup.location ? 'yes' : 'no') +
          ',directories=' + (this.popup.directories ? 'yes' : 'no')
        );
      },
      shared({type, item}) {
        let activeCat = '';
        this.activeTab.forEach(item => {
          item.contentTitles.indexOf(item.title) > -1 ? activeCat = item.title : null;
        });
        let mainurl = document.location.href + '?category=' + activeCat + '&block=' + encodeURI(item.title);
        switch (type) {
          case 'facebook': {
            this.facebook({mainurl, item});
            break;
          }
          case 'twitter': {
            this.twitter({mainurl, item});
            break;
          }
          case 'linkedin': {
            this.linkedin({mainurl, item});
            break;
          }
        }
      },
      facebook({mainurl, item}) {
        const url = encodeURIComponent(mainurl + item.title);
        const title = encodeURIComponent('ENQ - ' + item.title);
        const description = encodeURIComponent('#ENQ #Enecuum');
        const sharingUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&title=${title}&description=${description}`;
        this.share(sharingUrl);
      },
      twitter({mainurl, item}) {
        const url = encodeURIComponent(mainurl + item.title);
        const title = encodeURIComponent('ENQ - ' + item.title);
        const sharingUrl = `https://twitter.com/intent/tweet?text=${title}&url=${url}&hashtags=ENQ,Enecuum`;
        this.share(sharingUrl);
      },
      linkedin({mainurl, item}) {
        const url = encodeURIComponent(mainurl + item.title);
        const title = encodeURIComponent('ENQ - ' + item.title);
        const sharingUrl = `http://www.linkedin.com/shareArticle?mini=true&title=${title}&url=${url}`;
        this.share(sharingUrl);
      },
      copyToBuffer(activeTab) {
        let activeCat = '';
        let inp = document.createElement('input');
        this.activeTab.forEach(item => {
          item.contentTitles.indexOf(activeTab) > -1 ? activeCat = item.title : null;
        });
        inp.value = document.location.href + '?category=' + activeCat + '&block=' + encodeURI(activeTab);
        inp.classList.add('forselect');
        inp.style.position = 'fixed';
        inp.style.top = '-100%';
        inp.style.left = '-100%';
        document.body.appendChild(inp);
        let addr = document.querySelector('input.forselect');
        if (document.createRange) {
          addr.select();
          document.execCommand('copy');
          this.$message('Link copied');
        }
        addr.remove();
      },
      cutText(text) {
        if (text) {
          let pos = text.search(this.searchFaq);
          let offset = 10;
          return '...' + text.substring(pos - offset, pos + offset + this.searchFaq.length) + '...';
        }
        return '';
      },
      querySearchAsync(queryString, cb) {
        axios.get('/i18n/faq_' + 'en' + '.json').then(res => {
          let source = res.data.faq.main;
          let results = queryString ? this.createFilter(queryString, source) : [{value: 'Start typing...'}];
          cb(results);
        });
      },
      createFilter(queryString, faqSource) {
        let output = [];
        for (let i = 0; i < faqSource.length; i++) {
          for (let j = 0; j < faqSource[i].length; j++) {
            faqSource[i][j].content.forEach((block) => {
              if ((block.text.toLowerCase().search(queryString.toLowerCase()) > -1) || (block.title.toLowerCase().search(queryString.toLowerCase()) > -1)) {
                output.push({
                  value: block.title,
                  text: block.text,
                  category: faqSource[i][j].title
                });
              }
            });
          }
        }
        return output;
      },
      selectQuery(item) {
        this.activeCollapse = '0';
        this.activeTab.forEach((page, index) => {
          page.tabs.forEach(tab => {
            if (tab === item.category) {
              this.activeTab[index].title = item.category;
            }
          })
        });
        setTimeout(() => {
          this.activeCollapse = item.value;
          let coords = document.getElementById(item.value).getBoundingClientRect();
          window.scrollTo(0, coords.top - 80);
        }, 200);
      }
    },
    mounted() {
      axios.get('/i18n/faq_' + 'en' + '.json').then(res => {
        let arrayTab = [];
        res.data.faq.main.forEach((item, index) => {
          arrayTab[index] = {
            title: '',
            tabs: [],
            contentTitles: [],
          };
          item.forEach((block) => {
            arrayTab[index].title = item[0].title;
            arrayTab[index].tabs.push(block.title);
            block.content.forEach(cont => {
              arrayTab[index].contentTitles.push(cont.title);
            });
          });
        });
        this.activeTab = arrayTab;
        let query = this.$route.query;
        if (query.block && query.category) {
          this.selectQuery({category: query.category, value: query.block});
        }
      });
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/faq_' + 'en' + '.json');
      return {faq: data.faq}
    }
  }
</script>
