const mutations = {
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
  }
};

export default mutations
