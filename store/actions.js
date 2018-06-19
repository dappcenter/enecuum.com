import axios from 'axios';

const apiUrl = 'https://api.enecuum.com/v1';

const actions = {
  isAuth(store, {cookies}) {
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
        store.state.debug ? console.log('log from /lk', res.data) : null;
        if (res.data.ok) {
          if (res.data.code !== 511) {
            store.commit('SET_KYC_STATE', {status: res.data.ok, message: res.data.success, code: res.data.code});
          }
          store.commit('SET_AUTH', true);
          resolve('success');
        } else {
          if (res.data.code === 401) {
            store.dispatch('logoutClient');
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
    process.env.dev ? store.commit('SET_DEBUG', true) : null;
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
  logoutClient(state) {
    state.commit('SET_KYC_STATE', {});
    state.commit('SET_AUTH', false);
    console.log('logoutClient');
  },
  logoutServer(state) {
    axios.request({
      url: apiUrl + '/logout',
      method: 'post',
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
    }).then(_ => {
      state.dispatch('logoutClient');
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
