import axios from 'axios';

const apiUrl = 'https://api.enecuum.com/v1';

const actions = {
  isAuth(state, {cookies}) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/lk',
        method: 'get',
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Cookie: cookies ? cookies : ''
        },
      }).then((res) => {
        if (res.data.ok) {
          if (res.data.code !== 511) {
            state.commit('SET_KYC_STATE', {status: res.data.ok, message: res.data.success, code: res.data.code});
          }
          state.commit('SET_AUTH', true);
          resolve('success');
        } else {
          if (res.data.code === 401) {
            state.dispatch('logout');
          }
          resolve('notauth');
        }
      })
    });
  },
  nuxtServerInit(store, {req}) {
    let cookies = '';
    if (req.headers) {
      cookies = (req.headers.cookie);
    }
    store.commit('SET_COOKIES', cookies);
  },
  subscribeWP(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/whitelist',
        method: 'post',
        data: data,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        resolve(res.data);
      });
    })
  },
  sendFeedback(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/feedback',
        method: 'post',
        data: data,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        resolve(res.data);
      });
    })
  },
  sendJoinTheTeam(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/jointeam',
        method: 'post',
        data: data,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => {
        resolve(res.data);
      })
    });
  },
  signUp(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/signup',
        method: 'post',
        data: data,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      }).then(res => {
        resolve(res.data);
      })
    });
  },
  signIn(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/signin',
        method: 'post',
        data: data,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      }).then(res => {
        resolve(res.data);
      })
    });
  },
  resetPassword(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/recovery?email=' + data.email + '&tempPassword=' + data.tempPassword,
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        resolve(res.data);
      })
    });
  },
  logout(state) {
    axios.request({
      url: apiUrl + '/logout',
      method: 'post',
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    }).then(_ => {
      state.commit('SET_AUTH', false);
    });
  },
  submitKyc(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/kyc',
        method: 'post',
        data: data,
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        }
      }).then(res => {
        resolve(res.data);
      })
    })
  },
  signinRecoveryPassword(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/recovery',
        method: 'post',
        data: data,
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        resolve(res.data);
      })
    })
  }
};

export default actions
