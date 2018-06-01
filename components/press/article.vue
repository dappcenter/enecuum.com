<template>
  <div class="card">
    <img
      :src="'/img/press/'+article.link.match(/^https?:\/\/(www.)?([a-zA-Z\-\_]*)/)[article.link.match(/^https?:\/\/(www.)?([a-zA-Z\-\_]*)/).length-1]+'.png'"
      :alt="article.title" class="card-img">
    <div class="card-body">
      <h5 class="card-title">{{article.title}}</h5>
      <h6 class="card-place">{{new Date(article.date).toLocaleDateString()}}</h6>
      <div class="card-details">
        <div class="card-text">{{article.description}}</div>
      </div>
    </div>
    <div class="card-footer"><a :href="article.link" class="card-link" target="_blank">{{read}}</a></div>
  </div>
</template>

<script>
  export default {
    name: "art",
    props: {
      article: Object,
      read: String
    }
  }
</script>
