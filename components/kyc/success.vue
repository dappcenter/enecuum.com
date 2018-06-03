<template>
  <section class="container">
    <h1 class="page-title"></h1>
    <h2 class="h3 mb-3 font-weight-normal text-center">{{text}}</h2>
  </section>
</template>

<script>
  export default {
    name: "success",
    props: {
      text: String
    }
  }
</script>
