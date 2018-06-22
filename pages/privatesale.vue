<template>
  <section class="container faq">
    <h1 class="text-center page-title">Private Sale FAQ</h1>
    <el-row class="flex-center events faq-tabs">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <el-collapse v-model="activeCollapse" accordion class="enq-collapse">
          <el-collapse-item v-for="(item, key) in faq" :key="key" :title="item.title" :name="item.title"
                            :id="item.title">
            <div class="faq-tabs_content">
              <p v-html="item.text"></p>
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <div class="divider"></div>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <p class="text-center"><b>This FAQ is very helpful, but what if I have more questions?​​</b></p>
      </el-col>
    </el-row>
    <el-row class="flex-center">
      <el-col :xs="22" :sm="16" :md="16" :lg="14" :xl="14">
        <p class="text-center">If you have any more questions, please email our support at <br> <a
          href="mailto:support@enecuum.com">support@enecuum.com</a></p>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import axios from 'axios';
  import helpBlock from '@/components/faq/helpBlock';

  export default {
    name: "faq",
    data() {
      return {
        activeCollapse: ''
      }
    },
    async asyncData() {
      const {data} = await axios.get('/i18n/salerules_' + 'en' + '.json');
      return {faq: data.faq.content}
    }
  }
</script>
