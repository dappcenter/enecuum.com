<template>
  <section class="container">
    <banner :data="mainpage.banner"></banner>
    <phmining :data="mainpage.phonemining"></phmining>
    <breakthroughTech :data="mainpage.breakthroughtech"></breakthroughTech>
    <changingWorld :data="mainpage.changingworld"></changingWorld>
    <blockchain :data="mainpage.blockchain"></blockchain>
    <roadmap :data="mainpage.roadmap"></roadmap>
    <partners :data="mainpage.partners"></partners>
  </section>
</template>

<script>
  import banner from '@/components/mainpage/banner';
  import features from '@/components/mainpage/features';
  import businesscase from '@/components/mainpage/businesscase';
  import mining from '@/components/mainpage/mining';
  import phmining from '@/components/mainpage/phonemining';
  import roadmap from '@/components/mainpage/roadmap';
  import partners from '@/components/mainpage/partners';
  import feedback from '@/components/mainpage/feedback';
  import breakthroughTech from '@/components/mainpage/breakthroughTech';
  import changingWorld from '@/components/mainpage/changingWorld';
  import blockchain from '@/components/mainpage/blockchain';

  import axios from 'axios';

  export default {
    components: {
      banner,
      features,
      businesscase,
      mining,
      phmining,
      roadmap,
      partners,
      feedback,
      breakthroughTech,
      changingWorld,
      blockchain
    },
    mounted() {
      jarallax(document.querySelectorAll('.jarallax'), {
        imgSize: 'contain'
      });
      jarallax(document.querySelectorAll('.dna-img'), {
        imgSize: 'contain',
        speed: 0.2,
        type: 'scroll-opacity',
        imgElement: '.dna-img img'
      });
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/mainpage_' + 'en' + '.json');
      return {mainpage: data.mainpage}
    }
  }
</script>
