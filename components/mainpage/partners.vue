<template>
  <div class="partner flex-center" id="partners">
    <el-col :span="24" class="title">
      {{data.partners.title}}
    </el-col>
    <el-col :xs="22" class="flex-center">
      <el-col :xs="16" :sm="22">
        <el-row class="flex-center flex-wrap partner-pure" :gutter="40">
          <el-col :xs="24" :md="6" :sm="8" :lg="4" :xl="3" v-for="(partn, key) in data.partners.img" :key="key">
            <div class="partner-item"><a :href="partn.link" target="_blank"><img :src="partn.img" class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-col>
    <el-col :xs="16" :sm="22">
      <div class="page-sub-title">Ecosystem partners</div>
    </el-col>
    <el-col :xs="22" class="flex-center">
      <el-col :xs="16" :sm="22">
        <el-row class="flex-center flex-wrap partner-eco" :gutter="40">
          <el-col :xs="24" :md="6" :sm="8" :lg="4" v-for="(ecpart, eckey) in data.eco_partners.img" :key="eckey">
            <div class="partner-item"><a :href="ecpart.link" target="_blank"><img :src="ecpart.img" class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-col>
    <el-col :xs="16" :sm="22">
      <div class="page-sub-title">Media partners</div>
    </el-col>
    <el-col :xs="22" class="flex-center">
      <el-col :xs="16" :sm="22">
        <el-row class="flex-center flex-wrap partner-eco" :gutter="40">
          <el-col :xs="24" :md="6" :sm="8" :lg="4" v-for="(medpart, medkey) in data.media_partners.img" :key="medkey">
            <div class="partner-item"><a :href="medpart.link" target="_blank"><img :src="medpart.img" class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-col>
    <el-col :xs="16" :sm="22">
      <div class="page-sub-title">We are member of Fintech Association of Hong Kong</div>
    </el-col>
    <el-col :xs="22" class="flex-center">
      <el-col :xs="16" :sm="22">
        <el-row class="flex-center flex-wrap partner-eco" :gutter="40">
          <el-col :xs="24" :md="6" :sm="8" :lg="4" v-for="(medpart, medkey) in data.members.img" :key="medkey">
            <div class="partner-item"><a :href="medpart.link" target="_blank"><img :src="medpart.img" class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-col>
  </div>
</template>

<script>
  export default {
    name: "partners",
    props: ['data']
  }
</script>
