<template>
  <section class="footer flex-between">
    <div class="">
      <div>
        {{footerAddress.LINE_1}}
      </div>
      <div>
        {{footerAddress.LINE_2}}
      </div>
      <div>
        {{footerAddress.COPYRIGHT}} ·
        <a href="docs/Privacy.pdf">{{footerAddress.PRIVACY}}</a> ·
        <a href="docs/Terms.pdf">{{footerAddress.TERMS}}</a> ·
        <a href="mailto:hello@enecuum.com">{{footerAddress.MAILUS}}</a>
      </div>
    </div>
    <div class="footer_networks">
      <a v-for="(item, key) in social" :key="key" :href="item.link" target="_blank"
         @click="a({category: 'social', eventAction: 'click', eventLabel: item.type})">
        <img :src="item.img" alt="">
      </a>
    </div>
  </section>
</template>

<script>
  export default {
    name: "enq-footer",
    data() {
      return {
        footerAddress: {
          "LINE_1": "Enecuum HK Limited",
          "LINE_2": "Address: 21/F, 48 Connaught Road Central, Hong Kong",
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
      __dangerouslyDisableSanitizers: ['script'],
      script: [{
        type: 'application/ld+json',
        innerHTML: `{
          "@context": "http://schema.org/",
          "@type": "Organization",
          "url": "https://enecuum.com/",
          "name": "Enecuum | ENQ | Blockchain of Tomorrow",
          "sameAs": ["https://www.facebook.com/enecuum.EN/?ref=bookmarks", "https://twitter.com/enq_enecuum", "https://www.linkedin.com/company/enecuum-limited/"],
          "description": "Enecuum is a decentralized environment that aims to integrate blockchain technologies into both business and state structures. The technologies used in the project allow for solving various tasks: fintech, banking, document processing, insurance, logistics, IoT, DApps, ICO and more.",
          "logo": "head/favicon-32x32.png",
          "legalName": "Enecuum HK Limited"
        }`
      }]
    }
  }
</script>
