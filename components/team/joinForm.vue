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

  </el-row>
</template>

<script>
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
    methods: {
      submitForm() {
        let form = this.$refs.form;
        form.validate((valid) => {
          if (valid) {
            this.sendTeamForm();
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      },
      sendTeamForm() {
        let data = new FormData();
        data.append('file', this.$refs.upload.uploadFiles[0].raw);
        data.append('subject', this.form.subject);
        data.append('message', this.form.message);
        if (this.cq_user) {
          data.append('cq_user', this.cq_user);
        }
        this.loading = true;
        let isSended = this.$store.dispatch('sendJoinTheTeam', data);
        isSended.then((res) => {
          if (res.ok) {
            //a.send({category: 'subscribe', eventAction: 'send', eventLabel: 'subscribe'});
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
