<template>
  <div class="contribute" v-if="showing">
    <div class="contribute_answer" v-if="!sended">
      <h4 class="contribute_answer-title title-middle">Do you want to contribute to this answer?</h4>
      <el-input type="textarea" placeholder="Start typing your contribution" class="contribute_answer-textarea"
                :autosize="{ minRows: 6, maxRows: 8}" v-if="wantContribute"></el-input>
      <div class="contribute_answer-footer">
        <el-button type="default" class="enq-button default small active" v-if="!wantContribute" @click="wantContribute=true">
          Yes, definitely
        </el-button>
        <el-button type="default" class="enq-button default small active" v-else>Send answer</el-button>
        <el-button type="default" class="enq-button default small" v-if="!wantContribute" @click="showing=false">No
        </el-button>
      </div>
    </div>
    <div class="contribute_answer" v-else>
      <h4 class="contribute_answer-title sended title-middle">Thank you for your contribution.</h4>
      <h4 class="contribute_answer-title sended title-middle">Your opinion is very important for us!</h4>
    </div>
  </div>
</template>

<script>
  export default {
    name: "contribute",
    data() {
      return {
        showing: true,
        wantContribute: false,
        sended: false
      }
    }
  }
</script>
