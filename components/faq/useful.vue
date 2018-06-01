<template>
  <div>
    <div class="useful" v-if="!answer">
      <h4 class="useful_title">Was this answer useful for you?</h4>
      <div class="useful_footer">
        <el-button type="primary" class="neon" @click="showAnsw('yes')">Yes, definitely</el-button>
        <el-button type="default" class="enq-button default" @click="showAnsw('no')">No</el-button>
      </div>
    </div>
    <div class="useful" v-if="answer">
      <div v-if="good">
        <h4 class="useful_title mb0">Thank you for your answer.</h4>
        <h4 class="useful_title mb0">Your opinion is very important for us!</h4>
      </div>
      <div class="useful_reason" v-else>
        <el-radio-group v-model="reason" class="enq-radio flex-column">
          <el-radio :label="0">Not enouph inormative answer</el-radio>
          <el-radio :label="1">Not exact answer for my request</el-radio>
          <el-radio :label="2">Other reason</el-radio>
        </el-radio-group>
        <div class="useful_reason-text" v-show="showText">
          <el-form :model="reasonForm" ref="reasonForm">
            <el-form-item prop="message">
              <el-input type="textarea" v-model="reasonForm.message" placeholder="Start typing your reason"
                        :autosize="{ minRows: 6, maxRows: 10}"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-row class="text-left">
          <el-button type="primary" class="neon" @click="send">Send answer</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "useful",
    data() {
      return {
        answer: false,
        good: true,
        reason: 0,
        showText: false,
        reasonForm: {
          message: ''
        }
      }
    },
    watch: {
      "reason": function () {
        this.reason === 2 ? this.showText = true : this.showText = false;
      }
    },
    methods: {
      showAnsw(st) {
        this.answer = true;
        if (st === 'yes') {
          this.good = true;
        } else {
          this.good = false;
        }
      },
      send() {
        this.good = true;
        console.log('send');
      }
    }
  }
</script>
