<template>
  <div>
    <el-row :gutter="124">
      <el-col :xs="24" :md="12">
        <h3 class="title-middle">ENQ(ERC20) tokens</h3>
        <p>It is intended that possession of the ENQ(ERC20) token grants its holder a future right exchange it to the
          ENQ cryptocurrency at the rate of 1:1, if and when the Enecuum adaptive decentralized environment becomes
          operational. The exchange is proposed to be made through the Enecuum exchange mechanism. Further details about
          the Enecuum exchange mechanism will be provided in due course. ENQ(ERC20) is not intended to be a security,
          regulated product or a financial instrument of any kind.</p>
        <h3 class="title-middle">ENQ</h3>
        <p>ENQ is intended to be a utility token. Possession of ENQ is proposed to grant a holder access to the
          following proposed functionality of the Enecuum adaptive decentralized environment:</p>
        <p>a) accumulate and transfer ENQ subject to the ENQ tokens and conditions, and applicable laws;</p>
        <p class="mb0">b) publish SHARNELL Smart Contracts with a fee for publication to the global Enecuum network (the fee is
          determined according to the volume of the published byte code and established at 0.01 ENQ as the minimum
          fee);</p>
      </el-col>
      <el-col :xs="24" :md="12" class="pt44">
        <p>c) publish custom transactions (for example, a block size exceeding the upper limit for free transactions)
          with a reward calculated by the user publishing such transactions to stimulate the miners to validate such
          block;</p>
        <p>d) access complex computations via the "heavy” smart contracts. The reward for such computations is proposed
          to be dictated by the current market conditions where the user who places the request offers a reward and
          waits until miners (nodes) with enough computational power to run such “heavy” smart contract agree to it. The
          user may raise the reward to faster stimulate such miners;</p>
        <p>e) access and generate private ‘ticket’ branches using other nodes on the network (not the user’s). The
          reward is determined individually by the miner agreeing to service such branches; and</p>
        <p>f) participation in the PoS mining.</p>
        <p class="mb0">See the Enecuum <a href="/docs/Enecuum_WP.pdf">Position Paper</a> or the <a href="/">Enecuum Website</a> for
          further details.</p>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24">
        <div class="divider"></div>
      </el-col>
    </el-row>
    <el-row :gutter="124">
      <el-col :xs="24" :md="12">
        <h3 class="title-middle">Disclamer:</h3>
        <p>© 2018 Enecuum HK Limited. Company registration number : 2562183. All rights reserved. Nothing in this
          document constitutes an offer or advice of any kind. ENQ and the Enecuum adaptive decentralized environment
          may not be
          available in all jurisdictions and to all persons. Please see our <a href="/docs/Privacy.pdf">Privacy
            Policy</a> and <a href="/docs/Terms.pdf">Website Terms and Conditions</a></p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "token-utility"
  }
</script>
