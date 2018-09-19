<template>
  <section class="container faq">
    <tokensale v-if="false"></tokensale>
    <faq :faq="faq"></faq>
  </section>
</template>

<script>
  import faq from '@/components/privatesale/faq';
  import tokensale from '@/components/privatesale/tokensale';
  import axios from 'axios';

  export default {
    name: "privatesale",
    components: {
      faq,
      tokensale
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/salerules_' + 'en' + '.json');
      return {faq: data.faq.content}
    }
  }
</script>
