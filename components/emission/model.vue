<template>
  <div>
    <el-row :gutter="124">
      <el-col :xs="24" :md="12"><p>The ENQ emission model is proposed to progress in three stages. It is proposed that
        ENQ
        emission will grow in a logarithmic progression as shown in Diagram 1, where the horizontal axis represents
        years,
        and the vertical axis represents the percentage of the total ENQ to be generated.</p>
        <p>The upper limit of all ENQ in the system is proposed to be 4,324,320,000 ENQ.
          The three stages to the release of ENQ are intended as follows:</p>
      </el-col>
      <el-col :xs="24" :md="12">
        <img src="/img/tokens/il_2.png" alt="" class="img-fluid">
        <div class="title-under text-center">Diagram 1. Intended emission growth of ENQ</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24">
        <div class="divider"></div>
      </el-col>
    </el-row>
    <el-row :gutter="124">
      <el-col :xs="24" :md="12">
        <p class="title-middle text-center">ENQ emission model</p>
        <img src="/img/tokens/il_3.png" alt="" class="img-fluid">
        <div class="title-under text-center">Diagram 2. Intended ENQ emission model - percentage</div>
      </el-col>
      <el-col :xs="24" :md="12">
        <b class="title-mini">1. Stage one.</b>
        <p>30% of the total emission of ENQ is proposed to be pre-mined by the Enecuum development team in order to
          create an initial distribution pool. This equates to 1,297,296,000 ENQ.</p>
        <p>This initial pool is intended to be used in the future for exchange of ENQ(ERC20) to ENQ upon the launch of
          Eneccum adaptive decentralized environment. It is also intended to be used for the Enecuum development team
          and the reserve fund. See the heading “Token Sale and Conversion Plan” for further details.</p>
        <b class="title-mini">2. Stage two.</b>
        <p>During the 5 years following the end of Stage 1, a further 30% of the total ENQ emission is intended to be
          available to be mined, bringing the total ENQ emission mined to a maximum 60% of the total ENQ emission.</p>
        <b class="title-mini">3. Stage three.</b>
        <p>Following Stage 2 , the last mining stage is envisaged to start, covering the balance of ENQ emission (40% of
          the total ENQ emission, plus any other amount not previously mined during Stage 2). This stage is not proposed
          to be subject to any timing cap.</p>
        <p>The three stages are shown in Diagram 2.</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "model"
  }
</script>
