<template>
  <a :href="article.link" target="_blank" class="press middleblock">
    <img :src="article.img" :alt="article.title">
    <div class="press_info">
      <h2 class="press_info-title">{{article.title}}</h2>
      <div class="press_info-description">{{article.description}}</div>
      <div class="press_info-date">{{article.date}}</div>
    </div>
  </a>
</template>

<script>
  export default {
    name: "middlebanner",
    props: {
      article: Object
    }
  }
</script>
