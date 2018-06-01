<template>
  <section class="container account">
    <h1 class="text-center page-title">Personal account</h1>
    <el-row class="flex-center events">
      <el-col :xs="22" :sm="10" :md="12" :xl="10">
        <el-row :gutter="30" class="flex-center flex-wrap flex-column">
          <h3 class="text-center title-semibold text-uppercase mb13">Your balance</h3>
          <h4 class="text-center title-bold title-middle mb13">ENQ 30,00000000</h4>
          <el-alert
            class="enq-alert"
            :title="'Be aware! Contributing is available for the following legally approved Ethereum wallets: (список кошельков) Using exchanges is prohibited! You can contribute directly from your approved Ethereum wallet: 0x0682672607683a37439311fc1fe6b5540cef3e51'"
            type="info">
          </el-alert>
          <h4 class="text-center title-bold title-middle mb13 flex-center flex-middle addr-wrapper">
            <span class="addr">{{eth_address}}</span> <img
            src="/img/icons/copy.svg" class="ml13 account-copy"
            alt="" @click="copy"></h4>
        </el-row>
      </el-col>
    </el-row>
    <accountForm></accountForm>
  </section>
</template>

<script>
  import accountForm from '@/components/account/accountForm';

  export default {
    name: "faq",
    data() {
      return {
        eth_address: '0x0682672607683a37439311fc1fe6b5540cef3e51'
      }
    },
    components: {
      accountForm
    },
    methods: {
      copy() {
        let inp = document.createElement('input');
        inp.value = this.eth_address;
        inp.classList.add('forselect');
        inp.style.position = 'fixed';
        inp.style.top = '-100%';
        inp.style.left = '-100%';
        document.body.appendChild(inp);
        let addr = document.querySelector('input.forselect');
        if (document.createRange) {
          addr.select();
          document.execCommand('copy');
          this.$message('Wallet copied');
        }
        addr.remove();
      }
    }
  }
</script>
