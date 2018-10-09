<template>
  <section class="container">
    <department :team="team"></department>
    <joinForm></joinForm>
  </section>
</template>

<script>
  import department from '@/components/team/teamTemplate';
  import joinForm from '@/components/team/joinForm';
  import axios from 'axios';

  export default {
    name: "team",
    components: {
      department,
      joinForm
    },
    data() {
      return {
        interval: null
      }
    },
    computed: {
      title() {
        return this.$store.state.team.title;
      }
    },
    beforeRouteLeave(to, from, next) {
      clearInterval(this.interval);
      next()
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/team_' + 'en' + '.json');
      return {team: data.team}
    }
  }
</script>
