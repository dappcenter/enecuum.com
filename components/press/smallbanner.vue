<template>
  <div class="press smallblock">
    <img :src="'/img/press/'+article.link.match(/^https?:\/\/(www.)?([a-zA-Z\-\_]*)/)[article.link.match(/^https?:\/\/(www.)?([a-zA-Z\-\_]*)/).length-1]+'.png'"
         :alt="article.title">
    <div class="press_info">
      <h2 class="press_info-title">{{article.title}}</h2>
      <div class="press_info-date">{{article.date}}</div>
      <div class="press_info-description">{{article.description}}</div>
      <div class="press_info-read"><a :href="article.link" class="card-link" target="_blank">{{read}}</a></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "smalbanner",
    props: {
      article: Object,
      read: String
    }
  }
</script>
