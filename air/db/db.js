const mongoose = require('mongoose');

const {User, LiteKyc} = require('./models');

class MongoProvider {
  constructor(url) {
    mongoose.connect(url, (err) => {
      if (!err) {
        console.log('connect success')
      } else {
        console.log('error: ', err);
      }
    });
  }

  /**
   *
   * @param data
   * @returns {Promise<any>}
   */
  saveUser(data) {
    data.total = 25;
    data._id = new mongoose.Types.ObjectId();
    const _user = new User(data);
    return new Promise(resolve => {
      _user.save((err) => {
        if (err) {
          console.log('save user error: ', err);
          resolve(400);
        } else {
          let user = this.getUser(data);
          user.then(res => {
            resolve(res);
          })
        }
      });
    })
  }

  /**
   *
   * @param sessionid
   * @returns {Promise<any>}
   */
  restoreUser(sessionid) {
    return new Promise(resolve => {
      User.findOne({
        id: sessionid
      }).select('id name surname email twitter facebook linkedin telegram emailpro total kyc -_id').exec((err, user) => {
        if (err) {
          console.log('get user error: ', err);
          resolve(400);
        } else {
          resolve(user);
        }
      });
    })
  }

  /**
   *
   * @param data
   * @returns {Promise<any>}
   */
  getUser(data) {
    return new Promise(resolve => {
      User.findOne({
        email: data.email,
        password: data.password
      }).select('id name surname email twitter facebook linkedin telegram emailpro total kyc -_id').exec((err, user) => {
        if (err) {
          console.log('get user error: ', err);
          resolve(400);
        } else {
          resolve(user);
        }
      });
    })
  }

  /**
   *
   * @param data
   * @returns {Promise<any>}
   */
  getUserByEmail(data) {
    return new Promise(resolve => {
      User.findOne({
        email: data.email,
      }).select('id name surname email twitter facebook linkedin telegram emailpro total kyc -_id').exec((err, user) => {
        if (err) {
          console.log('get user error: ', err);
          resolve(400);
        } else {
          resolve(user);
        }
      });
    })
  }

  /**
   *
   * @param t
   * @param sessionid
   * @returns {Promise<any>}
   */
  updateUser({t, sessionid}) {
    return new Promise(resolve => {
        User.findOne({
          id: sessionid
        }).select('twitter facebook linkedin telegram emailpro total').exec((err, user) => {
          if (err) {
            console.log('get user error: ', err);
            resolve(400);
          } else {
            console.log('selected user is: ', user);
            try {
              if (!user) resolve(400);
              let incr = 0;
              user[t] = true;
              user.twitter ? incr += 20 : null;
              user.facebook ? incr += 20 : null;
              user.emailpro ? incr += 25 : null;
              user.linkedin ? incr += 20 : null;
              user.telegram ? incr += 40 : null;
              user.total = incr;
              user.save((err) => {
                if (err) {
                  console.log('save user error: ', err);
                  resolve(400);
                } else {
                  resolve({total: user.total});
                }
              });
            } catch (e) {
              console.log('error: ', e);
              resolve(400);
            }
          }
        });
      }
    )
  }

  /**
   *
   * @param data
   * @param sessionid
   * @returns {Promise<any>}
   */
  saveLiteKyc({data, sessionid}) {
    data._id = new mongoose.Types.ObjectId();
    const _liteKyc = new LiteKyc(data);
    return new Promise(resolve => {
      User.findOne({
        id: sessionid
      }).select('kyc').exec((err, user) => {
        if (user.kyc) {
          resolve(400);
        } else {
          _liteKyc.save((err) => {
            if (err) {
              console.log('save user error: ', err);
              resolve(400);
            } else {
              User.findOne({
                email: data.email,
              }).exec((err, user) => {
                console.log(err, user);
                user.kyc = true;
                user.save((err) => {
                  if (!err) {
                    resolve(200);
                  }
                });
              });
            }
          });
        }
      });
    });
  }

  /**
   *
   * @param sessionid
   * @returns {Promise<any>}
   */

  getLiteKyc({sessionid}) {
    return new Promise(resolve => {
      User.findOne({
        id: sessionid
      }).select('email').exec((err, user) => {
        if (user) {
          LiteKyc.findOne({
            email: user.email
          }).select('name nation birthDate walletInfo email -_id').exec((err, kyc) => {
            if (kyc) {
              resolve({ok: true, data: kyc});
            } else {
              resolve(400);
            }
          });
        } else {
          resolve(400);
        }
      });
    });
  }
}

let instance = '';
if (process.env.DB_PASSWORD) {
  instance = new MongoProvider('mongodb://' + (process.env.DB_USER || 'admin') + ':' + process.env.DB_PASSWORD + '@' + (process.env.DB_HOST || 'localhost') + ':' + (process.env.DB_PORT || '27017') + '/' + (process.env.DB_NAME || 'default'));
}
module.exports = instance;

