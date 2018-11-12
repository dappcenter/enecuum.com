<template>
  <div class="authorize">
    <el-row class="flex-center">
      <el-col :xs="22" :sm="14" :md="14" :lg="14" :xl="14">
        <h4 class="text-center title-bold text-uppercase title-middle mb vesting-wallet"><span>Token vesting</span>
        </h4>
        <el-row class="flex-center">
          <el-col :xs="22" :sm="12" :md="10" :lg="10" :xl="4">
            <h4 class="text-center title-under mb13">Select stage where you bought tokens</h4>
          </el-col>
        </el-row>
        <el-row class="flex-center mb13">
          <el-col :xs="20" :sm="8" :md="8" :lg="8" :xl="4">
            <el-select v-model="icoAddress" size="small" placeholder="Select stage"
                       v-loading="loadVestings">
              <el-option
                v-for="(addr, key) in icoAddressListReverse"
                :key="key"
                :label="'Stage '+ (key+1)"
                :value="addr">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row class="flex-center">
          <h4 class="text-center title-under mb13">
            <el-button type="default" size="small" @click.prevent="openVideo">How To
              Receive Tokens <i class="fa fa-play-circle-o"></i>
            </el-button>
          </h4>
        </el-row>
        <h3 class="text-center title-semibold mb13" v-if="vesting">{{vestingWallet}}</h3>
      </el-col>
    </el-row>
    <el-row class="vesting-table_wrapper" v-if="vesting">
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
    <el-row class="flex-center" v-else>
      <div>
        <el-alert
          :title="'You did not buy tokens at this stage, use the form above to purchase or select another stage'"
          type="info"
          :closable="false">
        </el-alert>
      </div>
    </el-row>
    <br>
    <el-row class="flex-center" v-if="vesting">
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
        loadVestings: false,
        interval: null,
        currentVestingBalance: 0,
        ia: 0,
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
      vesting: Boolean,
      ico: Object,
      token: Object,
      contractInfo: Object,
      icoAddressProp: String,
      icoAddressList: Array,
      changeVesting: Boolean,
      changeStage: Boolean
    },
    components: {
      lineChart
    },
    computed: {
      icoAddressListReverse: {
        get() {
          let addresses = this.icoAddressList.map(addr => addr);
          return addresses.reverse();
        }
      },
      icoAddress: {
        get() {
          return this.icoAddressProp;
        },
        set(val) {
          this.loadVestings = true;
          setTimeout(() => {
            this.loadVestings = false;
          }, 4800);
          this.$emit('changeStage', val);
        }
      },
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
      openVideo() {
        this.$emit('openVideo', '9EfS3k7NPzg', 'How To Receive Tokens');
      },
      getTokens() {
        this.vestingContract.release(this.contractInfo.tokenAddress, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!err) {
          }
        });
      },
      getTotal(releasable, alreadyReleased) {
        return bn(releasable).plus(alreadyReleased).toString();
      },
      getReleased() {
        this.vestingContract.released(this.contractInfo.tokenAddress, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!err) {
            this.vestingInfo.alreadyReleased = bn(res).dividedBy(1e10).toString();
          } else {
            console.log('vesting already released error: ', err);
          }
        });
      },
      getReleasableAmount() {
        this.vestingContract.releasableAmount(this.contractInfo.tokenAddress, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!err) {
            this.vestingInfo.releasable = bn(res).dividedBy(1e10).toString();
          } else {
            console.log('vesting releasable error: ', err);
          }
        });
      },
      getVestingAmount() {
        this.vestingContract.vestedAmount(this.contractInfo.tokenAddress, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!err) {
            this.vestingInfo.alreadyVesting = bn(res).dividedBy(1e10).toString();
          } else {
            console.log('vesting already vesting error: ', err);
          }
        });
      },
      getVestingBalance(wallet = this.vestingWallet) {
        return new Promise(resolve => {
          this.token.balanceOf(this.vestingWallet, {
            from: this.userInfo.wallet
          }, (err, res) => {
            resolve(bn(res).dividedBy(1e10).toString());
            if (!err) {
              resolve('error');
            }
          });
        })
      },
      vestingInit(once) {
        clearInterval(this.interval);
        console.log('vestingInit', this.chartdata.labels, this.chartdata.datasets[0].data);
        this.chartdata.datasets[0].data = [];
        this.ico.getVestingWallet(this.userInfo.currentWallet, {
          from: this.userInfo.wallet
        }, (err, res) => {
          if (!err) {
            this.vestingContract = web3.eth.contract(this.contractInfo.vestingAbi).at(res);
            this.vestingWallet = res;
            this.vestingContract.getStart({
              from: this.userInfo.wallet
            }, (err, res) => {
              if (!err) {
                this.vestingInfo.startDate = moment(new Date(bn(res).toNumber() * 1000)).format('MMMM Do YYYY HH:mm');
                this.vestingContract.getDuration((err, res) => {
                  if (!err) {
                    this.vestingInfo.endDate = moment(this.vestingInfo.startDate, 'MMMM Do YYYY HH:mm').add(bn(res).toNumber(), 'seconds').format('MMMM Do YYYY HH:mm');
                  } else {
                  }
                });
                this.vestingContract.getCliff({
                  from: this.userInfo.wallet
                }, (err, res) => {
                  if (!err) {
                    let date = moment(new Date(bn(res).toNumber() * 1000)).format('MMMM Do YYYY HH:mm');
                    this.vestingInfo.cliffDate = date;
                    console.log(this.vestingInfo);
                    this.chartdata.labels = [this.vestingInfo.startDate, this.vestingInfo.endDate];
                    this.chartdata.datasets[0].data[0] = 0;
                    if (!once) {
                      this.getAllVestingBallances();
                      this.loadVestings = false;
                      /*                      balance.then(res => {
                                              this.chartdata.datasets[0].data.push(bn(this.userInfo.balance).plus(bn(res)).toNumber());
                                              this.$refs.linechart.renderChart(this.chartdata, this.options);
                                              this.loadVestings = false;
                                            });*/
                    } else {
                      let balance = this.getVestingBalance();
                      balance.then(res => {
                        this.chartdata.datasets[0].data[1] = (bn(res).toNumber());
                        this.$refs.linechart.renderChart(this.chartdata, this.options);
                        this.loadVestings = false;
                      });
                    }
                    //this.vestingInfo.alreadyVesting = bn(res).dividedBy(1e10).toString();
                  } else {
                    this.loadVestings = false;
                  }
                });
              } else {
                this.loadVestings = false;
              }
            });
            this.getReleased();
            this.getReleasableAmount();
            this.getVestingAmount();
            this.getAllVestingBallances();
            this.interval = setInterval(() => {
              this.getReleased();
              this.getReleasableAmount();
              this.getVestingAmount();
              this.getAllVestingBallances();
            }, 10000);
          }
        });
      },
      getAllVestingBallances({emit = false} = {}) {
        return new Promise(rs => {
          let contracts = this.icoAddressList;
          let promisesContracts = contracts.map((addr, index) => {
            return new Promise(resolve => {
              let icoContract = web3.eth.contract(this.contractInfo.icoAbi).at(addr);
              icoContract.hasVestingWallet(this.userInfo.wallet, {
                from: this.userInfo.wallet
              }, (err, res) => {
                setTimeout(() => {
                  //console.log('has vesting: ', addr, res, err);
                  if (!err && res === true) {
                    icoContract.getVestingWallet(this.userInfo.currentWallet, {
                      from: this.userInfo.wallet
                    }, (err, vestingWallet) => {
                      setTimeout(() => {
                        this.token.balanceOf(vestingWallet, {
                          from: this.userInfo.wallet
                        }, (err, res) => {
                          //console.log('vesting balance of: ', vestingWallet, res);
                          //console.log(bn(res).dividedBy(1e10).toString());
                          resolve(bn(res).dividedBy(1e10).toString());
                        });
                      }, 1000);
                    });
                  } else {
                    resolve("0");
                  }
                }, 1000)
              });
            });
          });
          Promise.all(promisesContracts).then(res => {
            let total = res.reduce((sum, current) => {
              return bn(current).plus(sum);
            });
            if (emit) this.$emit('setVestingBalance', total.toString());
            rs(total.toString());
          });
        })
      }
    },
    watch: {
      'changeVesting': function () {
        this.getAllVestingBallances({emit: true});
        if (this.vesting) {
          this.vestingInit();
        }
      },
      'changeStage': function () {
        this.vestingInit(true);
      }
    },
    mounted() {
      setTimeout(() => {
        this.vestingInit(true);
      }, 1400);
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
