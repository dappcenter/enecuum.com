<template>
  <div class="tokensale">
    <div class="text-center">
      <nuxt-link :to="'/backoffice'">
        <button class="button-link orange">
          Join the token sale
        </button>
      </nuxt-link>
    </div>
    <div class="text-center mt60 mb60">
      <h2 class="page-title">End of token sale</h2>
      <div>
        <button class="button-link orange special text-uppercase">31 December 2018</button>
      </div>
    </div>
    <div class="mb40">
      <h2 class="text-center">All eligible participants may apply. Minimum participation is not limited</h2>
    </div>
    <div class="flex-center flex-wrap">
      <div class="button-link-lang">
        <a href="/docs/pp_en.pdf" class="button-link blue" target="_blank">
          Whitepaper
        </a>
        <div class="flag">
          <a :href="item.url" v-for="(item, key) in wp" :key="key" target="_blank"><img
            :src="'/img/flags/'+item.flag+'.png'" alt=""></a>
        </div>
      </div>
      <div class="button-link-lang">
        <a href="/docs/op_en.pdf" class="button-link blue" target="_blank">
          Onepager
        </a>
        <div class="flag">
          <a :href="item.url" v-for="(item, key) in op" :key="key" target="_blank"><img
            :src="'/img/flags/'+item.flag+'.png'" alt=""></a>
        </div>
      </div>
    </div>
    <h2 class="text-left block-title">Private sale stages</h2>
    <div class="schedule-table text-center">
      <el-table
        :data="scheduleData"
        style="display: inline-block;">
        <el-table-column
          prop="id"
          label=""
          width="50"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="start"
          label="Start"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="end"
          label="End"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="max"
          label="Max"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="min"
          label="Min"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="price"
          label="Price"
          header-align="center">
        </el-table-column>
        <el-table-column
          prop="limit"
          label="Stage limit"
          width="200"
          header-align="center">
        </el-table-column>
      </el-table>
    </div>
    <h2 class="text-left block-title">How to participate?</h2>
    <el-row class="infographs">
      <el-col :xs="24" :sm="12" :md="8" v-for="(item, key) in infographs" :key="key" class="infographs-wrapper">
        <div class="infographs-title">{{item}}</div>
        <img :src="'/img/privatesale/st'+(key+1)+'.png'" alt="">
      </el-col>
    </el-row>
    <div class="participate-footer flex-wrap">
      <div>
        <nuxt-link :to="'/backoffice'" class="button-link orange">Join token sale</nuxt-link>
      </div>
      <div v-if="false">Also you can <a href="" class="button-link blue">Download app</a> and mine ENQ</div>
    </div>
    <h2 class="text-left block-title">Tokenomics</h2>
    <el-row class="tokenomics" type="flex" justify="center">
      <div style="padding: 10px;">ENQ - utility token to access network functionality and reward TRINITY miners for
        transaction verification and smart contract publishing.
      </div>
    </el-row>
    <el-row class="tokenomics" type="flex" justify="center">
      <img src="/img/privatesale/emismodel.png" alt="">
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "tokensale",
    data() {
      return {
        wp: [{
          flag: 'cn',
          url: '/docs/pp_cn.pdf'
        }, {
          flag: 'en',
          url: '/docs/pp_en.pdf'
        }, {
          flag: 'jp',
          url: '/docs/pp_jp.pdf'
        }, {
          flag: 'ko',
          url: '/docs/pp_ko.pdf'
        }],
        op: [{
          flag: 'cn',
          url: '/docs/op_cn.pdf'
        }, {
          flag: 'en',
          url: '/docs/op_en.pdf'
        }, {
          flag: 'es',
          url: '/docs/op_es.pdf'
        }, {
          flag: 'jp',
          url: '/docs/op_jp.pdf'
        }, {
          flag: 'ko',
          url: '/docs/op_ko.pdf'
        }],
        infographs: ['Sign up www.enecuum.com', 'Fill in the form KYC (know more about KYC)', 'Wait for your KYC form approval', 'Choose amount of contribution', 'Buy your ENQ* tokens for ETH', 'Now you have your own part of the future'],
        scheduleData: [{
          id: 1,
          start: '22.06.2018',
          end: '31.10.2018',
          max: '2.000.000 USD',
          min: 'none',
          price: '1 ENQ = USD 0,04',
          limit: '5.967.564,6 USD'
        }, {
          id: 2,
          start: '01.11.2018',
          end: '30.11.2018',
          max: '1.000.000 USD',
          min: 'none',
          price: '1 ENQ = USD 0,05',
          limit: '13.128.235,52 USD'
        }, {
          id: 3,
          start: '01.12.2018',
          end: '31.12.2018',
          max: '1.000.000 USD',
          min: 'none',
          price: '1 ENQ = USD 0,06',
          limit: '4.774.049,28 USD'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
