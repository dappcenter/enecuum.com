import axios from 'axios';

const apiUrl = 'https://api.enecuum.com/v1';
const pureUrl = '//enecuum.com:8081';
const actions = {
  setWhiteList(store, data) {
    return new Promise(resolve => {
      axios.request({
        url: pureUrl + '/backoffice/whitelist',
        method: 'POST',
        data: data,
        timeout: 360 * 1000,
        withCredentials: true,
      }).then((res) => {
        resolve(res.data);
      })
    });
  },
  crutch(store) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/lk',
        method: 'get',
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        },
      }).then((res) => {
        if (res.data.ok) {
          store.dispatch('loginClient', res.data);
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
        if (res.data.ok) {
          store.dispatch('loginClient', res.data);
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
  getLang(store) {
    return new Promise(resolve => {
      axios.get('/i18n/statusCode_' + 'en' + '.json').then(res => {
        store.commit('SET_LANG', res.data);
        resolve('success');
      });
    })
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
        url: '//enecuum.com' + '/mail/sb',
        data: data,
        method: 'post',
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        }
      }).then(res => {
        if (res.status === 200) {
          resolve('success')
        } else {
          resolve('error');
        }
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
        if (res.data.code === 401) state.dispatch('logoutServer');
        axios.request({
          url: '//enecuum.com' + '/mail/reg',
          data: data,
          method: 'post',
          withCredentials: true,
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }
        });
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
        if (res.data.code === 401) state.dispatch('logoutServer');
        resolve(res.data);
      })
    });
  },
  resetPassword(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/recovery?email=' + data.email + '&tempPassword=' + data.tempPassword + '&recaptcha=' + data.recaptcha,
        method: 'get',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 401) state.dispatch('logoutServer');
        resolve(res.data);
      })
    });
  },
  loginClient(state, data) {
    state.commit('SET_KYC_STATE', {status: data.ok, message: data.success, code: data.code});
    state.commit('SET_AUTH', true);
  },
  logoutClient(state) {
    state.commit('SET_WEB3WALLET', '');
    state.commit('SET_KYC_STATE', {});
    state.commit('SET_AUTH', false);
  },
  logoutServer(state) {
    state.dispatch('logoutClient');
    axios.request({
      url: apiUrl + '/logout',
      method: 'post',
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      }
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
        if (res.data.code === 401) state.dispatch('logoutServer');
        if (res.data.ok) {
          axios.request({
            url: '//enecuum.com' + '/mail/kyc',
            data: data,
            method: 'post',
            withCredentials: true,
            headers: {
              'X-Requested-With': 'XMLHttpRequest',
            }
          });
        }
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
        if (res.data.code === 401) state.dispatch('logoutServer');
        resolve(res.data);
      })
    })
  },
  get2fa(state, {cookies}) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/2fa',
        method: 'get',
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json',
          Cookie: cookies ? cookies : ''
        }
      }).then(res => {
        if (res.data.code === 401) state.dispatch('logoutServer');
        if (res.data.code === 200) state.commit('SET_2FA', res.data.success);
        resolve(res.data);
      })
    })
  },
  set2fa(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/2fa',
        method: 'post',
        data: data,
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 401) state.dispatch('logoutServer');
        resolve(res.data);
      })
    })
  },
  walletVerification(state, data) {
    return new Promise(resolve => {
      axios.request({
        url: apiUrl + '/wallet',
        method: 'post',
        data: data,
        withCredentials: true,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 401) state.dispatch('logoutServer');
        resolve(res.data);
      })
    })
  }
};

export default actions
