<template>
  <section class="footer">
    <el-row :gutter="30" class="footer_links">
      <!--      <el-col :sm="24" :md="24" :lg="24">
              <el-row class="footer_links-wrapper" type="flex" justify="space-around">
                <el-col :sm="3" :md="4" v-for="(item, key) in links" :key="key">
                  <nuxt-link :to="item.url">{{item.title}}</nuxt-link>
                </el-col>
              </el-row>
            </el-col>-->
      <el-col :sm="12" :md="6" :lg="4" v-for="(item, key) in footerLinks" :key="key">
        <div class="footer_links-title">{{item.page}}</div>
        <ul class="footer_links-wrapper">
          <li class="footer_links-link" v-for="(link, lkey) in item.links" :key="lkey">
            <nuxt-link :to="link.url">{{link.title}}</nuxt-link>
          </li>
        </ul>
      </el-col>
    </el-row>
    <div class="footer_networks">
      <!--      <a v-for="(item, key) in social" :key="key" :href="item.link" target="_blank"
               @click="a({category: 'social', eventAction: 'click', eventLabel: item.type})">
              <img :src="'/'+item.img" alt="">
            </a>-->
      <div>
        {{footerAddress.LINE_1}}
      </div>
      <div>
        {{footerAddress.LINE_2}}
      </div>
      <div>
        {{footerAddress.COPYRIGHT}} ·
        <a href="/docs/privacy.pdf">{{footerAddress.PRIVACY}}</a> ·
        <a href="/docs/terms.pdf">{{footerAddress.TERMS}}</a> ·
        <a href="mailto:hello@enecuum.com">{{footerAddress.MAILUS}}</a>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "enq-footer",
    data() {
      return {
        footerLinks: [{
          page: 'Enecuum',
          links: [{
            title: 'What is Enecuum',
            url: '/#enq'
          }, {
            title: 'Phone Mining',
            url: '/#mining'
          }, {
            title: 'Technology',
            url: '/#mining'
          }, {
            title: 'Usecases',
            url: ''
          }, {
            title: 'Vision',
            url: '/#world'
          }, {
            title: 'Roadmap',
            url: '/#roadmap'
          }, {
            title: 'Partners',
            url: '/#partners'
          }]
        }, {
          page: 'Team',
          links: [{
            title: 'C-level',
            url: '/team#Our'
          }, {
            title: 'Advisory board',
            url: '/team#Advisory'
          }, {
            title: 'Cryptographers',
            url: '/team#Cryptographers'
          }, {
            title: 'Development',
            url: '/team#Development'
          }, {
            title: 'Marketing',
            url: '/team#Marketing'
          }, {
            title: 'Operations',
            url: '/team#Operations'
          }, {
            title: 'Join the team',
            url: '/team#joinTeam'
          }]
        }, {
          page: 'News and media',
          links: [{
            title: 'Blog',
            url: 'https://medium.com/@EnqBlockchain'
          }, {
            title: 'Calendar',
            url: '/calendar'
          }, {
            title: 'Video',
            url: '/video'
          }, {
            title: 'Press',
            url: '/press'
          }]
        }, {
          page: 'FAQ',
          links: [{
            title: 'Private sale',
            url: '/privatesale'
          }, {
            title: 'FAQ',
            url: '/faq'
          }, {
            title: 'Token FAQ',
            url: '/token'
          }]
        }, {
          page: 'Enter',
          links: [{
            title: 'Sign in',
            url: '/auth/login'
          }, {
            title: 'Sign up',
            url: '/auth/join'
          }]
        }],
        footerAddress: {
          "LINE_1": "Enecuum HK Limited",
          "LINE_2": "Address: Rm 1202, West Exchange Tower, 322 Des Voeux Road Central, Hong Kong",
          "LINE_3": "hello@enecuum.com",
          "MAILUS": "Email Us",
          "COPYRIGHT": "© 2018 Enecuum HK Ltd.",
          "PRIVACY": "Privacy Policy",
          "TERMS": "Terms & Conditions"
        }
      }
    },
    computed: {
      social() {
        return this.$store.state.social;
      }
    },
    head: {
      noscript: [
        {
          innerHTML: '<span><img src="https://mc.yandex.ru/watch/47793562" style="position:absolute; left:-9999px;" alt=""></span> <span> <img src="http://www.google-analytics.com/collect?v=1&t=pageview&tid=UA-114577800-1&cid=35009a79-1a05-49d7-b876-2b884d0f825b&dl=https%3A%2F%2Fenecuum.com&dt=nojs" style="position:absolute; left:-9999px;" alt=""></span><span><img src="//a.enecuum.com/a.php?idsite=GNL2r4zMP1&rec=1&action_name=nojs" style="position:absolute; left:-9999px; border:0;" alt=""></span>'
        }
      ],
      __dangerouslyDisableSanitizers: ['script', 'noscript'],
      script: [{
        type: 'application/ld+json',
        innerHTML: `{
          "@context": "http://schema.org/",
          "@type": "Organization",
          "url": "https://enecuum.com/",
          "name": "Enecuum | ENQ | Blockchain of Tomorrow",
          "short name":"ENQ",
          "sameAs": ["https://www.facebook.com/enecuum.EN/?ref=bookmarks", "https://twitter.com/enq_enecuum", "https://www.linkedin.com/company/enecuum-limited/"],
          "description": "Enecuum is a decentralized environment that aims to integrate blockchain technologies into both business and state structures. The technologies used in the project allow for solving various tasks: fintech, banking, document processing, insurance, logistics, IoT, DApps, ICO and more.",
          "logo": "head/favicon-32x32.png",
          "legalName": "Enecuum HK Limited"
        }`
      }]
    }
  }
</script>
