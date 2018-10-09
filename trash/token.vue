<template>
  <section class="container">
    <h1 class="text-center page-title">Emission Model & Token Sale Description</h1>
    <el-row class="flex-center events emission">
      <el-col :xs="22" :sm="20" :md="20" :xl="16">
        <el-tabs v-model="activeTab" class="enq-tabs">
          <el-tab-pane label="Introduction" name="intro">
            <intro></intro>
          </el-tab-pane>
          <el-tab-pane label="Disclaimer" name="disclaimer">
            <disclaimer></disclaimer>
          </el-tab-pane>
          <el-tab-pane label="Emission Model and Token Sale Description" name="model">
            <model></model>
          </el-tab-pane>
          <el-tab-pane label="Token Sale and Conversion Plan" name="tokenSale">
            <tokenSale></tokenSale>
          </el-tab-pane>
          <el-tab-pane label="Token Utility" name="tokenUtility">
            <tokenUtility></tokenUtility>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </section>
</template>

<script>
  import intro from '@/components/emission/intro';
  import disclaimer from '@/components/emission/disclaimer';
  import model from '@/components/emission/model';
  import tokenSale from '@/components/emission/tokenSale';
  import tokenUtility from '@/components/emission/tokenUtility';

  export default {
    name: "tokens",
    data() {
      return {
        activeTab: 'intro'
      }
    },
    components: {
      intro,
      disclaimer,
      model,
      tokenSale,
      tokenUtility
    }
  }
</script>
