<template>
  <el-row :gutter="124">
    <el-col :xs="24" :md="12"><p>ENQ, the token sale and the Enecuum adaptive decentralized environment are under
      development. They may be subject to change. No representation or warranty is given as to the achievement or
      reasonableness of any plans, future projections or prospects and nothing in this document is or should be relied
      upon as a promise or representation as to the future.</p>
      <p>This document also cross-refers to the disclaimer from the Enecuum’s whitepaper. The whitepaper is available at
        <a href="https://enecuum.com/docs/Enecuum_WP.pdf">https://enecuum.com/docs/Enecuum_WP.pdf</a>. The disclaimer
        from the whitepaper is included below to cover emergency cases when the official Enecuum’s site.</p>
      <h3 class="title-middle">The disclaimer from the above-mentioned Enecuum’s whitepaper.</h3>
      <p>This whitepaper and any other documents published in association with this whitepaper relate to the intended
        development and use of the Enecuum platform (“Enecuum”). They are for information purposes only and may be
        subject to change.</p>
    </el-col>
    <el-col :xs="24" :md="12">
      <el-collapse v-model="activeDiscl" accordion class="enq-collapse">
        <el-collapse-item title="This whitepaper describes a future project" name="1" class="mt-14">
          <p>This whitepaper contains forward-looking statements that are based on the beliefs of Enecuum HK Limited, a
            Hong Kong incorporated company (CR: 2562183) (“Company”), as well as certain assumptions made by and
            information available to the Company.</p>
          <p>Enecuum as envisaged in this whitepaper is under development and is being constantly updated, including but
            not limited to key governance and technical features. The ENQ token (“ENQ”) involves and relates to the
            development and use of experimental platforms (software) and technologies that may not come to fruition or
            achieve the objectives specified in this whitepaper.</p>
          <p>If and when Enecuum is completed, it may differ significantly from the network set out in this whitepaper.
            No representation or warranty is given as to the achievement or reasonableness of any plans, future
            projections or prospects and nothing in this document is or should be relied upon as a promise or
            representation as to the future.</p>
        </el-collapse-item>
        <el-collapse-item title="No offer of regulated products" name="2">
          <p>ENQ is not intended to represent a security or any other regulated product in any jurisdiction</p>
          <p>This document does not constitute an offer or solicitation of securities or any other regulated product,
            nor a promotion, invitation or solicitation for investment purposes. The terms of the purchase are not
            intended to be a financial service offering document or a prospectus of any sort.</p>
          <p>ENQ does not represent equity, shares, units, royalties or rights to capital, profit, returns or income in
            the platform or software or in the Company or any other company or intellectual property associated with the
            platform or any other public or private enterprise, corporation, foundation or other entity in any
            jurisdiction.</p>
        </el-collapse-item>
        <el-collapse-item title="This whitepaper is not advice" name="3">
          <p>This whitepaper does not constitute advice to purchase ENQ. It must not be relied upon in connection with
            any contract or purchasing decision.</p>
        </el-collapse-item>
        <el-collapse-item title="Risk warning" name="4">
          <p>The purchase of ENQ and participation in Enecuum carries with it significant risks.</p>
          <p>Prior to purchasing ENQ, you should carefully assess and take into account the risks, including those
            listed in any other documentation.</p>
        </el-collapse-item>
        <el-collapse-item title="Views of the Company" name="5">
          <p>The views and opinions expressed in this whitepaper are those of Enecuum and do not reflect the official
            policy or position of any government, quasi-government, authority or public body (including but not limited
            to any regulatory body of any jurisdiction) in any jurisdiction.</p>
          <p>Information contained in this whitepaper is based on sources considered reliable by the Company but there
            is no assurance as to their accuracy or completeness.</p>
        </el-collapse-item>
        <el-collapse-item title="No third party affiliation or endorsements" name="7">
          <p>References in this whitepaper to specific companies and platforms are for illustrative purposes only. The
            use of any company and/or platform names and trademarks does not imply any affiliation with, or endorsement
            by, any of those parties.</p>
        </el-collapse-item>
        <el-collapse-item title="You must obtain all necessary professional advice" name="8">
          <p>You must consult a lawyer, accountant, tax professional and/or any other professional advisors as necessary
            prior to determining whether to purchase ENQ or otherwise participate in the Enecuum network.</p>
        </el-collapse-item>
      </el-collapse>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "disclaimer",
    data() {
      return {
        activeDiscl: ''
      }
    }
  }
</script>
