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
      return {}
    },
    computed: {
      title() {
        return this.$store.state.team.title;
      }
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/team_' + 'en' + '.json');
      return {team: data.team}
    }
  }
</script>
