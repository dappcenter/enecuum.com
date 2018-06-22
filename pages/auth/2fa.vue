<template>
  <section class="container kyc">
    <GAuth></GAuth>
  </section>
</template>

<script>
  import GAuth from '@/components/authorize/checkGAuth';

  export default {
    name: "Gauth",
    middleware: 'check2auth',
    components: {
      GAuth
    }
  }
</script>
