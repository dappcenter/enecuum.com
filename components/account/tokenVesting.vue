<template>
  <div class="authorize">
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="14" :lg="14" :xl="14">
        <h4 class="text-center title-bold text-uppercase title-middle mb vesting-wallet">Token vesting</h4>
        <h3 class="text-center title-semibold mb13">0xc37e33f2ec0442803ec0531d0d58ae3cd5e11a26</h3>
      </el-col>
    </el-row>
    <el-row class="vesting-table_wrapper">
      <el-col :xs="22" :sm="22" :md="14" :xl="10">
        <el-row class="vesting-table">
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Beneficiary
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell vesting-wallet">
            {{userInfo.wallet}}
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Start date
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            Sunday, December 20th 2015 9:00:00pm
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            End date
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            Monday, December 20th 2015 9:00:00pm
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Total vesting
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            5000 enq
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Already vesting
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            100enq
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Already released
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            5000 enq
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Releasable
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            2018 enq
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="22" :md="8" :xl="12" class="vesting-chart_wrapper">
        <lineChart :chartData="data" :options="options" :height="250"></lineChart>
      </el-col>
    </el-row>
    <br>
    <el-row class="flex-center">
      <el-button type="primary" class="neon" :disabled="!verified ? 'disabled' : null">Receive token</el-button>
    </el-row>
  </div>
</template>

<script>
  import lineChart from './lineChart';

  export default {
    name: "token-vesting",
    props: {
      userInfo: Object,
      verified: Boolean
    },
    components: {
      lineChart
    },
    computed: {
      data() {
        return {
          labels: ['q1', 'q2', 'q3', 'q4'],
          datasets: [
            {
              label: '',
              fill: false,
              borderColor: '#00add9',
              data: [1, 1.5, 2, 2.5]
            }
          ]
        }
      },
      options() {
        return {
          legend: false,
          maintainAspectRatio: false
        }
      }
    }
  }
</script>
<style scoped lang="scss">
  .vesting {
    &-table {
      &_wrapper {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      @media screen and (max-width: 991px) {
        &_wrapper {
          flex-direction: column;
          padding: 0px 20px;
        }
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
    &-cell {
      position: relative;
      padding: 10px 15px;
      border: 1px solid #f3f3f3;
      display: flex;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 991px) {
        flex-direction: column;
      }
    }
    &-chart {
      &_wrapper {
        @media screen and (max-width: 991px) {
          margin-top: 20px;
        }
      }
    }
    &-wallet {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
