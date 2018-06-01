<template>
  <div class="card video">
    <img :src="video.preview_url" alt="" class="card-img">
    <div class="card-body">
      <h5 class="card-title ">{{video.name}}</h5>
      <h6 class="card-place">{{video.description}}</h6>
    </div>
    <div class="card-footer bg-transparent"><a href="#" class="card-link" @click="showVideo(video.video_url)">{{playButton}}</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "videoCard",
    props: {
      playButton: String,
      video: Object
    },
    methods: {
      showVideo(url) {
        this.$emit('showVideo', url.replace('watch?v=', 'embed/'));
      }
    }
  }
</script>
