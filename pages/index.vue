<template>
  <section class="container">
    <banner :data="mainpage.banner"></banner>
    <landings></landings>
    <ourmis></ourmis>
    <team></team>
    <roadmap :data="mainpage.roadmap"></roadmap>
    <partners :data="mainpage.partners"></partners>
    <citates></citates>
  </section>
</template>

<script>
  import banner from '@/components/mainpage/banner';
  import landings from '@/components/mainpage/landings';
  import ourmis from '@/components/mainpage/ourMission.vue';
  import roadmap from '@/components/mainpage/roadmap';
  import team from '@/components/mainpage/team';
  import partners from '@/components/mainpage/partners';
  import citates from '@/components/mainpage/citates';


  import axios from 'axios';

  export default {
    components: {
      banner,
      landings,
      ourmis,
      roadmap,
      team,
      partners,
      citates
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
