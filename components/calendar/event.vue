<template>
  <div class="card">
    <div class="card-header">{{event.date}}</div>
    <img :src="event.img" :alt="event.title" class="card-img">
    <div class="card-body">
      <h5 class="card-title">{{event.title}}</h5>
      <h6 class="card-place">{{event.place}}</h6>
      <el-collapse v-model="active" v-if="event.description!=='Coming soon...'">
        <el-collapse-item title="Details" name="1" class="card-details">
          <div class="card-text">{{event.description}}</div>
        </el-collapse-item>
      </el-collapse>
      <div class="card-text" v-else>{{event.description}}</div>
    </div>
    <div class="card-footer" v-if="event.link"><a :href="event.link" class="card-link" target="_blank">{{seemore}}</a></div>
  </div>
</template>

<script>
  export default {
    name: "event",
    props: {
      event: Object,
      seemore: String
    },
    data() {
      return {
        active: ''
      }
    }
  }
</script>
