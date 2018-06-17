<template>
  <div class="feedback flex-center border-off-inputs" id="feedback">
    <el-col :span="24" class="title">
      {{data.title}}
    </el-col>
    <el-col :xs="24" :md="16">
      <el-form :model="feedbackForm" :rules="rules" ref="feedbackForm">
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12">
            <el-form-item prop="name">
              <el-input v-model="feedbackForm.name" placeholder="Full name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item prop="email">
              <el-input v-model="feedbackForm.email" placeholder="Email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :xs="24" :sm="12">
            <el-form-item prop="subject">
              <el-select v-model="feedbackForm.subject" placeholder="Subject" class="full-selector">
                <el-option v-for="(item, key) in subjectList" :key="key" :label="item.text"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item prop="message">
              <el-input v-model="feedbackForm.message" placeholder="Message"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="flex-center send">
          <el-button type="primary" class="neon" :loading="loading" @click="submitFB">{{data.button}}</el-button>
        </el-row>
      </el-form>
    </el-col>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "feedback",
    props: ['data'],
    data() {
      return {
        loading: false,
        feedbackForm: {
          name: '',
          email: '',
          subject: '',
          message: '',
        },
        subjectList: [{
          value: 'HR',
          text: 'HR'
        }, {
          value: 'PR',
          text: 'PR'
        }, {
          value: 'OFFER',
          text: 'Partnership offer'
        }, {
          value: 'PROPOSAL',
          text: 'Propose a project'
        }, {
          value: 'SUPPORT',
          text: 'Ask for support'
        }],
        rules: {
          name: [
            {
              required: true,
              message: 'Full name is required'
            }
          ],
          email: [
            {
              required: true,
              message: 'Email is required'
            }
          ],
          subject: [
            {
              required: true,
              message: 'Subject is required'
            }
          ],
          message: [
            {
              required: true,
              message: 'Message is required'
            }
          ]
        }
      }
    },
    methods: {
      submitFB() {
        this.$refs['feedbackForm'].validate((valid) => {
          if (valid) {
            this.sendFeedbackForm();
          } else {
            return false;
          }
        });
      },
      sendFeedbackForm() {
        let data = this.feedbackForm;
        if (this.cq_user) {
          data.cq_user = this.cq_user;
        }
        this.loading = true;
        let isSended = this.$store.dispatch('sendFeedback', data);
        isSended.then((res) => {
          if (res.ok) {
            this.a({category: 'feedback', eventAction: 'send', eventLabel: 'feedback'});
            this.$notify({
              title: 'Success',
              message: res.success,
              type: 'success',
              position: 'bottom-left'
            });
            this.$refs['feedbackForm'].resetFields();
          } else {
            this.$notify({
              title: 'Error',
              message: res.error,
              type: 'error',
              position: 'bottom-left'
            });
          }
          this.loading = false;
        }).catch(() => {
          this.$notify({
            title: 'Error',
            message: "Something went wrong, sorry",
            type: 'error',
            position: 'bottom-left'
          });
          this.loading = false;
        });
      }
    }
  }
</script>
