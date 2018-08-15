<template>
  <section class="container">
    <h1 class="text-center page-title">{{gallery.title}}</h1>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="20" :md="22" :xl="16">
        <el-row :gutter="30" class="flex-start flex-wrap">
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(video, key) in gallery.videos" :key="key">
            <videoCard :video="video" :playButton="gallery.playButton" @showVideo="showVid">
            </videoCard>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog
      title="Showing video"
      :visible.sync="modalVisible" class="card-iframe">
      <iframe :src="currentVideoUrl" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
    </el-dialog>
  </section>
</template>

<script>
  import videoCard from '@/components/video/video';
  import axios from 'axios';

  function gallerySort(data) {
    data.videos.sort((a, b) => {
      if (a.id < b.id) {
        return true;
      } else {
        return false;
      }
    });
    return data;
  }
  export default {
    name: "vid",
    data() {
      return {
        modalVisible: false,
        currentVideoUrl: ''
      }
    },
    components: {
      videoCard
    },
    methods: {
      showVid(url) {
        this.currentVideoUrl = url;
        this.modalVisible = true;
      }
    },
    async asyncData() {
      const {data} = await
        axios.get('/i18n/gallery_' + 'en' + '.json');
      return {gallery: gallerySort(data.gallery)}
    }
  }
</script>
