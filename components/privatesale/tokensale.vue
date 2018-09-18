<template>
  <div class="tokensale">
    <div class="text-center">
      <button class="button-link orange">
        Join the token sale
      </button>
    </div>
    <div class="text-center mt60 mb60">
      <h2 class="page-title">End of token sale</h2>
      <div>
        <button class="button-link orange special text-uppercase">31 October 2018</button>
      </div>
    </div>
    <div class="mb40">
      <h2 class="text-center">All eligible participants may apply. Minimum participation is not limited</h2>
    </div>
    <div class="flex-center flex-wrap">
      <div class="button-link-lang">
        <a href="" class="button-link blue">
          Whitepaper
        </a>
        <div class="flag">
          <a :href="item.url" v-for="(item, key) in wp" :key="key"><img
            :src="'/img/flags/'+item.flag+'.png'" alt=""></a>
        </div>
      </div>
      <div class="button-link-lang">
        <a href="" class="button-link blue">
          Onepager
        </a>
        <div class="flag">
          <a :href="item.url" v-for="(item, key) in op" :key="key"><img
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
          prop="limit"
          label="Stage limit"
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
      <div><a href="" class="button-link orange">Join token sale</a>
      </div>
      <div>Also you can <a href="" class="button-link blue">Download app</a> and mine ENQ</div>
    </div>
    <h2 class="text-left block-title">Tokenomics</h2>
    <el-row class="tokenomics">
      <el-col :xs="24" :sm="24" :md="12">
        As the Enecuum adaptive decentralized environment is still under development, we aim to conduct the ENQ token
        Sale on Ethereum using an Ethereum-based smart contract. It is proposed that ENQ(ERC20) will initially be issued
        as part of the ENQ token Sale.

        596,756,160 ENQ(ERC20) are proposed to be available for sale under the ENQ token Sale, which will be subject to
        the ENQ token Sale terms and conditions (available upon successful completion of the token sale KYC process).
        The price for the sale is proposed to be 1 ENQ(ERC20) = 0.04 USD. It is intended that it will be possible to
        exchange ENQ(ERC20) for ENQ at a rate of 1:1, once the Enecuum adaptive decentralized environment is
        operational;

        See Diagram for further detail regarding the breakdown of ENQ Stage 1 emission and connected proposed exchange
        of ENQ(ERC20) to ENQ.
      </el-col>
      <el-col :xs="24" :sm="24" :md="12"></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "tokensale",
    data() {
      return {
        wp: [{
          flag: 'ko',
          url: '/docs/pp_cn.pdf'
        }, {
          flag: 'rus',
          url: '/docs/pp_cn.pdf'
        }, {
          flag: 'britain',
          url: '/docs/pp_cn.pdf'
        }, {
          flag: 'spain',
          url: '/docs/pp_cn.pdf'
        }],
        op: [{
          flag: 'ko',
          url: '/docs/op_ko.pdf'
        }, {
          flag: 'rus',
          url: '/docs/op_jp.pdf'
        }, {
          flag: 'britain',
          url: '/docs/op_cn.pdf'
        }, {
          flag: 'spain',
          url: '/docs/pp_cn.pdf'
        }],
        infographs: ['Sign up www.enecuum.com', 'Fill in the form KYC (know more about KYC)', 'Wait for your KYC form approval', 'Choose amount of contribution', 'Buy your ENQ* tokens for ETH', 'Now you have your own part of the future'],
        scheduleData: [{
          id: 1,
          start: '22.06.2018',
          end: '01.10.2018',
          max: '2.000.000 USD',
          min: 'none',
          limit: '5.967.564,6 USD'
        }, {
          id: 2,
          start: '01.10.2018',
          end: '21.10.2018',
          max: '1.000.000 USD',
          min: 'none',
          limit: '13.128.235,52 USD'
        }, {
          id: 3,
          start: '22.10.2018',
          end: '31.10.2018',
          max: '1.000.000 USD',
          min: 'none',
          limit: '4.774.049,28 USD'
        }]
      }
    }
  }
</script>

<style scoped>

</style>
