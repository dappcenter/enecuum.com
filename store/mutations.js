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
  },
  SET_LANG(state, objects) {
    state.lang = objects;
  },
  SET_2FA(state, objects) {
    state.info2fa = objects;
  }
};

export default mutations
