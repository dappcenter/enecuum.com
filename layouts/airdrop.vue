<template>
  <section class="airdrop">
    <airdropHeader></airdropHeader>
    <nuxt/>
    <airdropFooter></airdropFooter>
  </section>
</template>
<script>
  import airdropHeader from '@/components/airdropHeader';
  import airdropFooter from '@/components/airdropFooter';

  export default {
    name: 'airdrop',
    components: {
      airdropHeader,
      airdropFooter
    }
  }
</script>
