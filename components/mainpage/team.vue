<template>
  <div class="subteam">
    <div v-for="(department, mkey) in team" :key="mkey" v-if="mkey===0">
      <h1 class="page-title" v-if="mkey===0">Team and Advisors</h1>
      <h2 class="text-center page-sub-title" v-else>Team and Advisors</h2>
      <el-row class="flex-center" v-for="(row, rkey) in department.reducedMembers" :key="rkey">
        <el-col :xs="12" :md="18" :lg="20" :xl="12">
          <el-row :gutter="0" class="flex-center flex-wrap">
            <el-col :sm="6" :md="6" :lg="5" v-for="(member, key) in row" :key="key">
              <div class="member-item"><img :src="member.avatar" class="member-item_avatar">
                <div class="member-item_name">{{member.name}}</div>
                <div class="member-item_position">{{member.position}}</div>
                <div class="member-item_contacts_links">
                  <a v-for="(soc, skey) in member.social" :key="skey" :href="soc.url" target="_blank">
                    <i :class="'fa fa-'+soc.type" aria-hidden="true"></i>
                  </a>
                </div>
                <div class="member-item_contacts_description">
                  <el-popover
                    placement="bottom"
                    trigger="click">
                    <span slot="reference" class="member-item_contacts_description-link"> See more </span>
                    <div v-html="member.description" class="member-item_contacts_description-text"></div>
                  </el-popover>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="subteam_button">
      <button class="button-link blue">View all</button>
    </div>
  </div>
</template>

<script>
  import department from '@/components/team/teamTemplate';
  import axios from 'axios';

  export default {
    name: "team",
    data() {
      return {
        team: []
      }
    },
    components: {
      department
    },
    mounted() {
      const data = axios.get('/i18n/team_' + 'en' + '.json');
      data.then(res => {
        console.log(res.data.team);
        this.team = res.data.team;
      });
    }
  }
</script>
