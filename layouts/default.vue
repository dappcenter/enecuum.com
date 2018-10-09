<template>
  <section class="container-wrapper">
    <enqHeader></enqHeader>
    <nuxt/>
    <!--<enqFooter></enqFooter>-->
  </section>
</template>
<script>
  import enqHeader from '@/components/enqHeader';
  // import enqFooter from '@/components/enqFooter';

  export default {
    components: {
      enqHeader,
      // enqFooter
    }
  }
</script>
