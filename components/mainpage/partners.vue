<template>
  <div class="partner pureBlock" id="partners">
    <el-row type="flex" justify="center">
      <el-col :md="22" :lg="18" class="pureBlock-title">
        <el-row>
          <el-col :xs="24" :sm="24">
            <div class="new title title-center title-bold">
              {{data.partners.title}}
            </div>
          </el-col>
        </el-row>
        <el-row class="flex-wrap partner-pure flex-center" v-for="(block, key) in data.partners.img"
                :key="key">
          <el-col :xs="24" :md="6" :sm="8" :lg="5" v-for="(partn, bkey) in block" :key="bkey"
                  class="flex-middle">
            <div class="partner-item"><a :href="partn.link" target="_blank"><img :src="partn.img"
                                                                                 class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
        <el-row class="flex-wrap partner-eco flex-center">
          <el-col :xs="24" :sm="22">
            <div class="page-sub-title text-center">Ecosystem and business partners</div>
          </el-col>
          <el-col :xs="24" :md="6" :sm="8" :lg="5" v-for="(ecpart, eckey) in data.eco_partners.img" :key="eckey"
                  class="flex-middle">
            <div class="partner-item"><a :href="ecpart.link" target="_blank"><img :src="ecpart.img"
                                                                                  class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
        <el-row class="flex-wrap partner-eco flex-center">
          <el-col :xs="24" :sm="22">
            <div class="page-sub-title text-center">Legal advisor</div>
          </el-col>
          <el-col :xs="24" :md="6" :sm="8" :lg="5" v-for="(legal, legkey) in data.legal_partners.img" :key="legkey">
            <div class="partner-item"><a :href="legal.link" target="_blank"><img :src="legal.img"
                                                                                 class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
        <el-row class="flex-wrap partner-eco flex-center">
          <el-col :xs="24" :sm="22">
            <div class="page-sub-title text-center">We are member of Fintech Association of Hong Kong</div>
          </el-col>
          <el-col :xs="24" :md="6" :sm="8" :lg="5" v-for="(medpart, medkey) in data.members.img" :key="medkey">
            <div class="partner-item"><a :href="medpart.link" target="_blank"><img :src="medpart.img"
                                                                                   class="partner-item_avatar"></a>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "partners",
    props: ['data']
  }
</script>
