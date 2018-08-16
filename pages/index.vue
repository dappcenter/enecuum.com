<template>
  <section class="container">
    <banner :data="mainpage.banner"></banner>
    <landings></landings>
<!--    <phmining :data="mainpage.phonemining"></phmining>-->
    <ourmis></ourmis>
    <team></team>
    <!--    <breakthroughTech :data="mainpage.breakthroughtech"></breakthroughTech>
        <blockchain :data="mainpage.blockchain"></blockchain>-->
    <roadmap :data="mainpage.roadmap"></roadmap>
    <partners :data="mainpage.partners"></partners>
    <citates></citates>
  </section>
</template>

<script>
  import banner from '@/components/mainpage/banner';
  import landings from '@/components/mainpage/landings';
  import phmining from '@/components/mainpage/phonemining';
  import ourmis from '@/components/mainpage/ourMission.vue';
  import changingWorld from '@/components/mainpage/changingWorld';
  import roadmap from '@/components/mainpage/roadmap';
  import team from '@/components/mainpage/team';
  import partners from '@/components/mainpage/partners';
  import citates from '@/components/mainpage/citates';

  /*  import features from '@/components/mainpage/features';
    import businesscase from '@/components/mainpage/businesscase';
    import mining from '@/components/mainpage/mining';
    import phmining from '@/components/mainpage/phonemining';



    import feedback from '@/components/mainpage/feedback';
    import breakthroughTech from '@/components/mainpage/breakthroughTech';
    import blockchain from '@/components/mainpage/blockchain';*/


  import axios from 'axios';

  export default {
    components: {
      banner,
      landings,
      phmining,
      ourmis,
      changingWorld,
      roadmap,
      team,
      partners,
      citates
      /*      banner,
            features,
            businesscase,
            mining,
            phmining,
            roadmap,
            partners,
            feedback,
            breakthroughTech,
            changingWorld,
            blockchain,
            landings*/
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
