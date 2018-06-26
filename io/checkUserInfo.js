const axios = require(require.resolve('axios'));
const apiUrl = 'https://api.enecuum.com/v1';

function checkUserInfo(client, {cookies}) {
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
      client.emit('checked', {status: res.data.ok, message: res.data.success, code: res.data.code});
    } else {
      client.emit('checked', 401);
    }
  })
}

module.exports = checkUserInfo;
