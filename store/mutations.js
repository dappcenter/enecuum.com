const mutations = {
  SET_AIRDROP_USER(state, object) {
    state.airdropUser = object;
  },
  SET_AIRDROP_AUTH(state, boolean) {
    state.isAirdropAuth = boolean;
  },
  SET_AUTH(state, boolean) {
    state.isAuth = boolean;
  },
  SET_CQ(state, string) {
    state.cq_user = string;
  },
  SET_COOKIES(state, string) {
    state.cookies = string;
  },
  SET_KYC_STATE(state, obj) {
    state.kyc = obj;
  },
  SET_DEBUG(state, boolean) {
    state.debug = boolean;
  },
  SET_LANG(state, objects) {
    state.lang = objects;
  },
  SET_2FA(state, objects) {
    state.info2fa = objects;
  },
  SET_WEB3WALLET(state, string) {
    state.web3wallet = string
  }
};

export default mutations
