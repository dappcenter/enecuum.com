<template>
  <div>
    <div v-for="(department, mkey) in team" :key="mkey" :id="department.title.split(' ')[0]">
      <h1 class="text-center page-title" v-if="mkey===0">{{department.title}}</h1>
      <h2 class="text-center page-sub-title" v-else>{{department.title}}</h2>
      <el-row class="flex-center" v-for="(row, rkey) in department.members" :key="rkey">
        <el-col :xs="12" :md="16" :lg="14" :xl="12">
          <el-row :gutter="50" class="flex-center flex-wrap">
            <el-col :sm="6" :md="6" :lg="6" v-for="(member, key) in row" :key="key">
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
  </div>
</template>

<script>
  export default {
    name: "team-template",
    data() {
      return {
        active: ''
      }
    },
    props: {
      team: Array
    }
  }
</script>
