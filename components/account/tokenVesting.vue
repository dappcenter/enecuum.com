<template>
  <div class="authorize">
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="14" :lg="14" :xl="14">
        <h4 class="text-center title-bold text-uppercase title-middle mb vesting-wallet">Token vesting</h4>
        <h3 class="text-center title-semibold mb13">{{vestingWallet}}</h3>
      </el-col>
    </el-row>
    <el-row class="vesting-table_wrapper">
      <el-col :xs="22" :sm="22" :md="22" :xl="10">
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
            {{vestingInfo.startDate}}
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Cliff
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            {{vestingInfo.cliffDate}}
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            End date
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            {{vestingInfo.endDate}}
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Already vesting
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            {{vestingInfo.alreadyVesting}} ENQ
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Already released
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            {{vestingInfo.alreadyReleased}} ENQ
          </el-col>
          <el-col :xs="22" :sm="10" :md="8" :lg="8" :xl="8" class="vesting-cell">
            Releasable
          </el-col>
          <el-col :xs="22" :sm="12" :md="14" :lg="14" :xl="14" class="text-center vesting-cell">
            {{vestingInfo.releasable}} ENQ
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="22" :sm="22" :xl="12" class="vesting-chart_wrapper">
        <lineChart ref="linechart" :chartData="chartdata" :options="options" :height="250"></lineChart>
      </el-col>
    </el-row>
    <br>
    <el-row class="flex-center">
      <el-button type="primary" class="neon" :disabled="!verified ? 'disabled' : null" @click="getTokens">Receive
        token
      </el-button>
    </el-row>
  </div>
</template>

<script>
  import lineChart from './lineChart';
  import bn from 'bignumber.js';
  import moment from 'moment';

  export default {
    name: "token-vesting",
    data() {
      return {
        currentVestingBalance: 0,
        vestingWallet: '',
        vestingInfo: {
          startDate: '',
          endDate: '',
          cliffDate: '',
          totalVesting: '',
          alreadyVesting: '',
          alreadyReleased: '',
          releasable: ''
        },
        chartdata: {
          labels: [],
          datasets: [
            {
              label: '',
              fill: false,
              borderColor: '#00add9',
              data: []
            }
          ]
        }
      }
    },
    props: {
      userInfo: Object,
      verified: Boolean,
      ico: Object,
      token: Object,
      contractInfo: Object
    },
    components: {
      lineChart
    },
    computed: {
      data() {
        return {}
      },
      options() {
        return {
          legend: false,
          maintainAspectRatio: false
        }
      }
    },
    methods: {
      getTokens() {
        this.vestingContract.release(this.contractInfo.tokenAddress, (err, res) => {
          if (!err) {
            console.log(res);
          }
        });
      },
      getTotal(releasable, alreadyReleased) {
        return bn(releasable).plus(alreadyReleased).toString();
      },
      getReleased() {
        this.vestingContract.released(this.contractInfo.tokenAddress, (err, res) => {
          if (!err) {
            this.vestingInfo.alreadyReleased = bn(res).dividedBy(1e10).toString();
          } else {
            console.log('vesting already released error: ', err);
          }
        });
      },
      getReleasableAmount() {
        this.vestingContract.releasableAmount(this.contractInfo.tokenAddress, (err, res) => {
          if (!err) {
            this.vestingInfo.releasable = bn(res).dividedBy(1e10).toString();
          } else {
            console.log('vesting releasable error: ', err);
          }
        });
      },
      getVestingAmount() {
        this.vestingContract.vestedAmount(this.contractInfo.tokenAddress, (err, res) => {
          if (!err) {
            this.vestingInfo.alreadyVesting = bn(res).dividedBy(1e10).toString();
          } else {
            console.log('vesting already vesting error: ', err);
          }
        });
      },
      getVestingBalance() {
        return new Promise(resolve => {
          this.token.balanceOf(this.vestingWallet, (err, res) => {
            this.$emit('setVestingBalance', bn(res).dividedBy(1e10).toString());
            resolve(bn(res).dividedBy(1e10).toString());
            if (!err) {
              resolve('error');
            }
          });
        })
      }
    },
    mounted() {
      this.ico.getVestingWallet(this.userInfo.currentWallet, (err, res) => {
        if (!err) {
          this.vestingContract = web3.eth.contract(this.contractInfo.vestingAbi).at(res);
          this.vestingWallet = res;

          this.vestingContract.getStart((err, res) => {
            if (!err) {
              this.vestingInfo.startDate = moment(new Date(bn(res).toNumber() * 1000)).format('MMMM Do YYYY HH:mm');
              this.vestingContract.getDuration((err, res) => {
                if (!err) {
                  this.vestingInfo.endDate = moment(this.vestingInfo.startDate, 'MMMM Do YYYY HH:mm').add(bn(res).toNumber(), 'seconds').format('MMMM Do YYYY HH:mm');
                } else {
                }
              });
              this.vestingContract.getCliff((err, res) => {
                if (!err) {
                  let date = moment(new Date(bn(res).toNumber() * 1000)).format('MMMM Do YYYY HH:mm');
                  this.vestingInfo.cliffDate = date;
                  this.chartdata.labels.push(this.vestingInfo.startDate);
                  this.chartdata.datasets[0].data.push(0);
                  this.chartdata.labels.push(this.vestingInfo.endDate);
                  let balance = this.getVestingBalance();
                  balance.then(res => {
                    this.chartdata.datasets[0].data.push(bn(this.userInfo.balance).plus(bn(res)).toNumber());
                    this.$refs.linechart.renderChart(this.chartdata, this.options);
                  });
                  //this.vestingInfo.alreadyVesting = bn(res).dividedBy(1e10).toString();
                } else {
                }
              });
            } else {
            }
          });
          this.getReleased();
          this.getReleasableAmount();
          this.getVestingAmount();
          this.getVestingBalance();
          setInterval(() => {
            this.getReleased();
            this.getReleasableAmount();
            this.getVestingAmount();
            this.getVestingBalance();
          }, 5000);
        }
      });
    }
  }
</script>
<style scoped lang="scss">
  .vesting {
    &-table {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      &_wrapper {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
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
