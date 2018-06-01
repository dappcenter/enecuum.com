<template>
  <el-row class="flex-center account__form-wrapper">
    <el-col :xs="22" :sm="12" :md="14" :xl="10">
      <el-row :gutter="30" class="flex-center flex-wrap">
        <el-form :model="accountForm" :rules="rulesAccountForm" ref="accountForm"
                 class="account__form flex-middle flex-center">
          <el-form-item label="YOU INVEST" prop="invest">
            <el-input v-model="accountForm.invest" placeholder="0000000 ETH"></el-input>
          </el-form-item>
          <el-form-item label="YOU GET" prop="get">
            <el-input v-model="accountForm.get" placeholder="0000000 ENQ"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="buy" class="neon">Buy tokens</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "account-form",
    data() {
      return {
        accountForm: {
          invest: null,
          get: null
        },
        rulesAccountForm: {
          invest: [{
            required: true,
            message: 'This field is required'
          }],
          get: [{
            required: true,
            message: 'This field is required'
          }]
        }
      }
    },
    methods: {
      buy() {
        let form = this.$refs.accountForm;
        form.validate((valid) => {
          if (valid) {
          } else {
            setTimeout(() => {
              form.clearValidate();
            }, 3000);
            return false;
          }
        });
      }
    }
  }
</script>
