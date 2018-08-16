<template>

</template>

<script>
  export default {
    name: "phonemining",
    props: ['data'],
    data() {
      return {
        description: '',
        title: '',
        hide: 0
      }
    },
    methods: {
      open(li, key) {
        this.description = li.description;
        this.title = li.title;
        this.hide = key;
      }
    },
    mounted() {
      this.description = this.data.list[0].description;
      this.title = this.data.list[0].title;
    }
  }
</script>
