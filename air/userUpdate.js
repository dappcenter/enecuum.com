const db = require('./db/db');

module.exports = (data) => {
  return new Promise(resolve => {
    console.log('updating user to db...', data);
    if (data.ko) {
      return db.updateUser({
        t: data.t,
        tw: data.tw,
        tl: data.tl,
        fb: data.fb,
        sessionid: data.session
      }).then(user => {
        console.log('user after update: ', user.ok);
        if (user.ok) {
          resolve({ok: true, message: user.total});
        } else {
          resolve({ok: false, message: user.message});
        }
      });
    } else {
      resolve({ok: false, message: user.message});
    }
  });
}
