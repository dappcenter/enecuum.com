<template>
  <el-row class="flex-center">
    <el-col :xs="22" :sm="10" :md="12" :xl="10">
      <el-row :gutter="30" class="flex-center flex-wrap flex-column">
        <el-card class="airdrop" shadow="hover" v-for="(item, key) in airdropData" :key="key">
          <div class="airdrop_background">
            <i :class="'fa fa-'+item.type" aria-hidden="true"></i>
          </div>
          <div class="airdrop_join" v-if="!item.joined">
            <el-button type="primary" @click="joinAirdrop(item)">Join</el-button>
          </div>
          <div class="airdrop_items" v-else>
            <div class="airdrop_items-block-wrapper" v-for="(task, tkey) in item.tasks" :key="tkey">
              <div class="airdrop_items-block" :class="task.complete ? ' complete' : ''">
                {{task.title}}
              </div>
            </div>
            <div class="airdrop_items-block-wrapper">
              <div class="airdrop_items-block">
                <h3 class="airdrop_items-block-title">{{item.reward}}</h3>
                <div class="airdrop_items-block-description">
                  ENQ
                </div>
              </div>
            </div>
          </div>
          <div class="airdrop_footer">
            <el-button @click="item.showTerm=true" type="text">Terms</el-button>
          </div>
          <el-dialog
            title="Terms"
            :visible.sync="item.showTerm"
            width="30%"
            center>
            <div>
              <ul class="airdrop_footer-terms">
                <li v-for="(term, tekey) in item.terms" :key="tekey" v-html="term">
                </li>
              </ul>
            </div>
          </el-dialog>
        </el-card>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import socket from '~/plugins/socket.io.js';

  export default {
    name: "airdrop",
    data() {
      return {
        terms: false,
        airdropData: [{
          type: 'facebook',
          joined: false,
          showTerm: false,
          terms: ['You must have at least 300 friends. If you have been rejected due to less than 300 friends, do not resent your application with updated followers list. The application will be denied.', 'You have to be a follower of official Enecuum facebook page (<a href="https://www.facebook.com/enecuum.EN/">https://www.facebook.com/enecuum.EN/</a>)', 'Facebook friends count will not be updated after your registration', 'You have to make at least 1 original post (with your own content) and 1 repost per campaign.'],
          tasks: [{
            title: 'Repost on Facebook',
            complete: false
          }, {
            title: 'Original post on Facebook',
            complete: false
          }],
          reward: 25
        }, {
          type: 'twitter',
          joined: false,
          showTerm: false,
          terms: ['You must have at least 250 followers. If you have been rejected due to less than 250 followers, do not resent your application with updated followers list. The application will be denied', 'You have to be a follower of official Enecuum Twitter', 'Do not retweet tweets older than 1 week. It will not be counted. (<a href="https://twitter.com/ENQ_enecuum">https://twitter.com/ENQ_enecuum</a>)', 'Your Twitter audit must be at least 80%', 'Twitter followers count will not be updated after your registration', 'You have to make at least 2 original tweets (with your own content) and 2 retweets per campaign', 'You must use our hashtags: #Enecuum #ENQ , #mobilemining in original tweets'],
          tasks: [{
            title: 'Repost on Twitter',
            complete: false
          }, {
            title: 'Original tweet on Twitter',
            complete: false
          }],
          reward: 30
        }, {
          type: 'telegram',
          joined: false,
          showTerm: false,
          terms: ['Follow Enecuum Telegram group to get a reward', 'Quitting during the ongoing airdrop is restricted. If you quit the channel before the campaign is over, your reward will be annulled'],
          tasks: [{
            title: 'JOIN ENQ TELEGRAM',
            complete: false
          }],
          reward: 40
        }, {
          type: 'envelope-o',
          joined: false,
          showTerm: false,
          terms: ['Leave your application (email) to participate in Airdrop'],
          tasks: [{
            title: 'LEAVE YOUR EMAIL',
            complete: false
          }],
          reward: 25
        }]
      }
    },
    methods: {
      joinAirdrop(item) {
        window.open("//enecuum.com:8081/oauth/" + item.type, "", "width=400,height=300");
        item.joined = true
      }
    }
  }
</script>

<style scoped lang="scss">
  .airdrop {
    position: relative;
    min-height: 286px;
    margin-bottom: 20px;
    &_background {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 200px;
      opacity: .05;
      z-index: 1;
    }
    &_footer {
      display: flex;
      align-items: center;
      padding: 0px 20px;
      position: relative;
      z-index: 2;
      justify-content: center;
      &-terms {
        padding-left: 20px;
        li {
          margin-bottom: 5px;
        }
      }
    }
    &_join {
      position: absolute;
      z-index: 1;
      display: flex;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
    }
    &_items {
      display: flex;
      justify-content: center;
      &-block {
        text-align: center;
        min-height: 150px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        border-radius: 4px;
        border: 1px solid #ebeef5;
        opacity: .7;
        user-select: none;
        &.complete {
          opacity: 1;
          border-color: #67c23a;
        }
        &-wrapper {
          width: 33.33%;
          padding: 20px;
        }
      }
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
</style>
