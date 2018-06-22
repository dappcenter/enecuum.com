<template>
  <section class="container faq">
    <h1 class="text-center page-title">Private Sale FAQ</h1>
    <el-row class="flex-center events enq-tabs faq-tabs">
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
