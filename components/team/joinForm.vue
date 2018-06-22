<template>
  <el-row class="flex-center teamForm">
    <el-col :xs="20" :md="16" :lg="14" :xl="14">
      <el-collapse v-model="active">
        <el-collapse-item name="1" class="collapse-header">
          <template slot="title">
            <el-button type="default" class="enq-button--blue-plain">Join the team</el-button>
          </template>
          <el-form :model="form" :rules="rules" ref="form" class="relative">
            <el-form-item prop="subject">
              <el-input placeholder="Subject" v-model="form.subject"></el-input>
            </el-form-item>
            <el-form-item prop="message">
              <el-input type="textarea" placeholder="Message" v-model="form.message" class="textarea"></el-input>
              <el-upload
                class="teamForm-upload"
                ref="upload"
                action=""
                :limit="1"
                accept=".txt, .doc, .docx, .xls, .xlsx, .png, .jpg, .jpeg, .gif"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="text" icon="fa fa-paperclip" circle
                           class="circle"></el-button>
              </el-upload>
            </el-form-item>
            <el-form-item class="flex-center">
              <el-button type="primary" @click="submitForm" class="neon" :loading="loading">Send</el-button>
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </el-col>
    <vue-recaptcha size="invisible" :sitekey="recaptchaKey" @verify="onVerify"
                   ref="invisibleRecaptcha"></vue-recaptcha>
  </el-row>
</template>

<script>
  import VueRecaptcha from 'vue-recaptcha';

  export default {
    name: "foin-form",
    data() {
      return {
        active: '',
        loading: false,
        form: {
          subject: '',
          message: ''
        },
        rules: {
          subject: [{required: true, message: 'Subject is required'}],
          message: [{required: true, message: 'Message is required'}]
        }
      }
    },
    components: {
      'vue-recaptcha': VueRecaptcha
    },
    computed: {
      recaptchaKey() {
        return require('@/config/config.json').recaptchaKey;
      }
    },
    methods: {
      onVerify(response) {
        this.sendTeamForm(response);
      },
      submitForm() {
        let form = this.$refs.form;
        form.validate((valid) => {
          if (valid) {
            this.$refs.invisibleRecaptcha.execute();
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      },
      sendTeamForm(captcha) {
        let data = new FormData();
        data.append('file', this.$refs.upload.uploadFiles[0].raw);
        data.append('subject', this.form.subject);
        data.append('message', this.form.message);
        data.append('captcha', this.form.subject);
        data.recaptcha = captcha;
        this.loading = true;
        let isSended = this.$store.dispatch('sendJoinTheTeam', data);
        isSended.then((res) => {
          if (res.ok) {
            this.$message({
              type: "success",
              message: res.success
            });
          } else {
            this.$message({
              type: "error",
              message: res.error
            });
          }
          this.loading = false;
          this.$refs.invisibleRecaptcha.reset();
        }).catch(() => {
          this.$message({
            type: "error",
            message: "Something went wrong, sorry"
          });
          this.loading = false;
        });
      }
    }
  }
</script>
