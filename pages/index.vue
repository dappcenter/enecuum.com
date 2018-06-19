<template>
  <section class="container">
    <banner :data="mainpage.banner"></banner>
    <features :data="mainpage.features"></features>
    <businesscase :data="mainpage.businesscase"></businesscase>
    <mining :data="mainpage.mining"></mining>
    <phmining :data="mainpage.phonemining"></phmining>
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
      feedback
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/mainpage_' + 'en' + '.json');
      return {mainpage: data.mainpage}
    }
  }
</script>
