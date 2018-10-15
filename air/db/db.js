const mongoose = require('mongoose');

const {User, LiteKyc, WaitingReg, ResetPwd} = require('./models');

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
   * @returns {Promise<any>}
   */
  getAirdropCount() {
    return new Promise(resolve => {
      User.find({}).select('total -_id').exec((err, users) => {
        if (err) {
          resolve({ok: false});
        } else {
          let totalAirdrops = users.reduce((sum, current) => {
            return parseInt(sum.total || sum) + parseInt(current.total);
          });
          resolve({
            ok: true, message: {
              totalSupply: process.env.AIRDROP_TOTAL_SUPPLY,
              totalAirdrop: totalAirdrops
            }
          });
        }
      });
    })
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
            resolve({ok: false});
          } else {
            try {
              if (!user) resolve({ok: false});
              let incr = 0;
              user[t] = true;
              user.twitter ? incr += 20 : null;
              user.facebook ? incr += 20 : null;
              user.emailpro ? incr += 25 : null;
              user.linkedin ? incr += 20 : null;
              user.telegram ? incr += 40 : null;
              user.total = incr;

              this.getAirdropCount().then(total => {
                if (total.ok) {
                  if (total.message.totalAirdrop + incr < total.message.totalSupply) {
                    user.save((err) => {
                      if (err) {
                        console.log('save user error: ', err);
                        resolve({ok: false});
                      } else {
                        resolve({ok: true, total: user.total});
                      }
                    });
                  } else {
                    resolve({ok: false, message: 'Airdrop supply limit sorry'});
                  }
                }
              });
            } catch (e) {
              console.log('error: ', e);
              resolve({ok: false});
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
   * @param data
   * @param sessionid
   * @returns {Promise<any>}
   */
  updateLiteKyc({data, sessionid}) {
    return new Promise(resolve => {
      User.findOne({
        id: sessionid
      }).select('email').exec((err, user) => {
        console.log(data);
        LiteKyc.update({
          email: user.email
        }, {
          nation: data.nation,
          birthDate: data.birthDate,
          walletInfo: data.walletInfo
        }, (err) => {
          if (err) {
            console.log('save user error: ', err);
            resolve(400);
          } else {
            resolve(200);
          }
        });
      });
    });
  }

  /**
   *
   * @param data
   * @returns {Promise<any>}
   */
  getWaitingRegUser(data) {
    console.log('verification vode from db: ');
    return new Promise(resolve => {
      WaitingReg.findOne({
        verificationCode: data.verification.replace(' ', '+')
      }).select('id name surname email password country').exec((err, user) => {
        if (!user || err) {
          console.log('get waiting user error: ', err);
          resolve(false);
        } else {
          console.log(user);
          let us = Object.assign({}, user._doc);
          delete us._id;
          WaitingReg.findByIdAndRemove(user._id, (err, res) => {
            console.log('after removing" ', err, res);
            if (err) {
              console.log('remove user error: ', err);
              resolve(false);
            } else {
              resolve(us);
            }
          });
        }
      });
    });
  }

  /**
   *
   * @param data
   * @returns {Promise<any>}
   */
  saveWaitingRegUser({data}) {
    data._id = new mongoose.Types.ObjectId();
    const _user = new WaitingReg(data);
    return new Promise(resolve => {
      _user.save((err) => {
        if (err) {
          console.log('save waitingRegUser error: ', err);
          resolve(400);
        } else {
          resolve(data.verificationCode);
        }
      });
    })
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

  resetPassword({email, verificationCode}) {
    const _user = new ResetPwd({email, verificationCode});
    return new Promise(resolve => {
      _user.save((err) => {
        if (err) {
          console.log('save waitingRegUser error: ', err);
          resolve(400);
        } else {
          resolve(verificationCode);
        }
      });
    })
  }

  restorePassword({code, password}) {
    return new Promise(resolve => {
      ResetPwd.findOne({
        verificationCode: code.replace(' ', '+')
      }).select('email').exec((err, us) => {
        console.log('us from restore pwd', us);
        if (!us || err) {
          console.log('get restoring user error: ', err);
          resolve(400);
        } else {
          User.update({
            email: us.email
          }, {
            password: password
          }, (err) => {
            if (err) resolve(400);
            ResetPwd.findByIdAndRemove(us._id, (err, res) => {
              if (err) {
                console.log('remove restore pwd error: ', err);
                resolve(400);
              } else {
                resolve({ok: true});
              }
            });
          });
        }
      })
    })
  }
}

let instance = '';
if (process.env.DB_PASSWORD) {
  instance = new MongoProvider('mongodb://' + (process.env.DB_USER || 'admin') + ':' + process.env.DB_PASSWORD + '@' + (process.env.DB_HOST || 'localhost') + ':' + (process.env.DB_PORT || '27017') + '/' + (process.env.DB_NAME || 'default'));
}
module.exports = instance;

