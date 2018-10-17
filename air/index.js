const dev = require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();
const db = require('./db/db');
const crypto = require('crypto');
const multer = require('multer');
const mail = require('./../mail/mailer');
const zmq = require('zeromq');
const {confirmMail, recoveryMail} = require('./sendmail');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './air/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  }
});


app.use(cookieSession({
  name: 'session',
  keys: [process.env.SESS_KEY_SIGN, process.env.SESS_KEY_VERIFY],
  maxAge: 60 * 60 * 1000 * 24 * 7
}));
app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*"); //process.env.DOMAIN_URL
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const socket = zmq.socket('push');
socket.bindSync('tcp://' + process.env.MQ_SERVER);

require('./social/twitter')(app, socket);
require('./social/telegram')(app, socket);

app.get('/oauth/close', (req, res) => {
  res.send('<script>window.close();</script>')
});

app.post('/api/airdrop/resetpassword', (req, res) => {
  let data = req.body;
  if (!data.email) {
    return res.send({
      ok: false,
      message: 'Some fields are empty'
    });
  }
  let verification = crypto.createHash('sha256').update(process.env.SESS_KEY_SIGN + new Date().getTime() + data.email + process.env.SESS_KEY_VERIFY).digest('hex');
  data.verificationCode = verification;
  db.getUserByEmail(data).then(user => {
    if (user !== 400) {
      console.log(user);
      db.resetPassword(data).then(verificationCode => {
        if (verificationCode !== 400) {
          console.log('verificationCode: ', verificationCode);
          recoveryMail({email: data.email.toLowerCase(), code: verificationCode}).then(mail => {
            if (mail.ok) {
              return res.send({
                ok: true,
                message: 'Check your email'
              })
            } else {
              return res.send({
                ok: false,
                message: 'Cant send email'
              });
            }
          });
        } else {
          return res.send({
            ok: false,
            message: 'Something went wrong please try later'
          });
        }
      });
    } else {
      return res.send({
        ok: false,
        message: 'Email does not exists'
      });
    }
  });
});

app.post('/api/airdrop/restore', (req, res) => {
  let data = req.body;
  if (!data.code && !data.password) {
    return res.send({
      ok: false,
      message: 'Some fields are empty'
    });
  }
  if (data.password !== data.confirmPassword) {
    return res.send({
      ok: false,
      message: 'Password do not match'
    });
  }
  const pwd = crypto.createHash('sha256').update(process.env.SESS_KEY_SIGN + data.password + process.env.SESS_KEY_VERIFY).digest('base64');
  db.restorePassword({code: data.code, password: pwd}).then(user => {
    if (user === 400) {
      return res.send({
        ok: false,
        message: 'Something went wrong'
      });
    } else {
      return res.send({
        ok: true
      });
    }
  });
});

app.post('/api/airdrop/verification', (req, res) => {
  if (!req.body.verification) {
    return res.send({
      ok: false,
      message: 'Verification code is empty'
    });
  }
  console.log('get waiting user body: ', req.body);
  return db.getWaitingRegUser(req.body).then(wuser => {
    if (wuser) {
      console.log('get waiting reg user: ', wuser);
      let isSended = mail.send('ad', {
        EMAIL: wuser.email.toLowerCase(),
        FIRST_NAME: wuser.name,
        LAST_NAME: wuser.surname
      });
      return isSended.then(mail => {
        if (mail.status === 200) {
          return db.saveUser(wuser).then(user => {
            if (user !== 400 && user) {
              req.session.user = user.id;
              console.log();
              if (wuser.enqWallet) {
                db.saveLiteKyc({
                  data: {
                    email: wuser.email,
                    enqWallet: wuser.enqWallet
                  }, sessionid: user.id
                }).then(_ => {
                  res.send({
                    ok: true
                  });
                });
              } else {
                res.send({
                  ok: true
                });
              }
            } else {
              return res.send('User not found');
            }
          });
        } else {
          return res.send({ok: false, message: 'Please check your email or use another email address.'});
        }
      });
    } else {
      return res.send({
        ok: false,
        message: 'Wrong verification code'
      });
    }
  })
});

app.post('/api/airdrop/registration', (req, res) => {
  req.session.user = null;
  res.clearCookie('session.sig', {path: '/'}).status(200);
  if (!req.body.name && !req.body.surname && !req.body.email && !req.body.password && !req.body.country) {
    return res.send({
      ok: false,
      message: 'Some fields are empty'
    });
  }
  const pwd = crypto.createHash('sha256').update(process.env.SESS_KEY_SIGN + req.body.password + process.env.SESS_KEY_VERIFY).digest('base64');
  const id = crypto.createHash('sha256').update(new Date().getTime() + Math.random() * 9999 + (process.env.SESS_KEY_SIGN + process.env.SESS_KEY_VERIFY)).digest('base64');
  req.body.email = req.body.email.toLowerCase();
  req.body.password = pwd;
  req.body.id = id;
  return db.getUserByEmail(req.body).then(user => {
      console.log(user);
      if (user && user !== 400) {
        return res.send({ok: false, message: 'Email already exists'});
      } else {
        let verification = crypto.createHash('sha256').update(req.body.email + req.body.password + req.body.id).digest('hex');
        req.body.verificationCode = verification;
        return db.saveWaitingRegUser({data: req.body}).then(verificationCode => {
          if (verificationCode !== 400) {
            confirmMail({email: req.body.email, code: verificationCode}).then(mail => {
              if (mail.ok) {
                return res.send({
                  ok: true,
                  message: 'Check your email'
                })
              } else {
                return res.send({
                  ok: false,
                  message: 'Cant send email'
                });
              }
            });
          } else {
            return res.send({
              ok: false,
              message: 'Something went wrong'
            })
          }
        });
        /*console.log('not exist');
        let isSended = mail.send('ad', {
          EMAIL: req.body.email.toLowerCase(),
          FIRST_NAME: req.body.name,
          LAST_NAME: req.body.surname
        });
        return isSended.then(mail => {
          if (mail.status === 200) {
            return db.saveUser(req.body).then(user => {
              if (user !== 400 && user) {
                req.session.user = id;
                res.send(user);
              } else {
                return res.send('User not found');
              }
            });
          } else {
            return res.send({ok: false, message: 'Please check your email or use another email address.'});
          }
        });*/
      }
    }
  );
});

app.get('/api/airdrop/getAllAirdrop', (req, res) => {
  return db.getAirdropCount().then(total => {
    if (total.ok) {
      res.send(total);
    } else {
      res.send({ok: false, message: 'Something went wrong'});
    }
  });
});

app.get('/api/airdrop/logout', (req, res) => {
  req.session.user = null;
  res.clearCookie('session.sig', {path: '/'}).status(200);
  res.clearCookie('session', {path: '/'}).status(200);
  res.send({ok: true});
});

app.post('/api/airdrop/login', (req, res) => {
  if (req.session.user && (!req.body.email && !req.body.password)) {
    return db.restoreUser(req.session.user).then(user => {
      if (user !== 400 && user) {
        return res.send({ok: true, message: user});
      } else {
        req.session = null;
      }
    });
  }
  if (!req.body.email || !req.body.password) {
    return res.send({
      ok: false,
      message: 'Some fields are empty'
    });
  }
  const pwd = crypto.createHash('sha256').update(process.env.SESS_KEY_SIGN + req.body.password + process.env.SESS_KEY_VERIFY).digest('base64');
  req.body.email = req.body.email.toLowerCase();
  req.body.password = pwd;
  return db.getUser(req.body).then(user => {
    if (user !== 400 && user) {
      req.session.user = user.id;
      return res.send(user);
    } else {
      return res.send('User not found');
    }
  });
});

app.get('/api/airdrop/litekyc', (req, res) => {
  if (!req.session.user) return res.send('Permission denied');
  db.getLiteKyc({sessionid: req.session.user}).then(kyc => {
    if (kyc.ok) {
      return res.send({ok: true, message: kyc.data});
    } else {
      return res.send({ok: false});
    }
  });
});

const upload = multer({
  storage: storage,
  fileFilter(req, file, cb) {
    let filetypes = ['jpeg', 'jpg', 'gif', 'png', 'bmp', 'pdf'];
    if (filetypes.includes(file.originalname.toLowerCase().split('.').slice(-1)[0])) {
      cb(null, true);
    } else {
      cb(new Error('Filetype not allowed'));
    }
  }
});
const fileUpload = upload.single('file');

app.post('/api/airdrop/litekyc', (req, res) => {
  if (!req.session.user) return res.send('Permission denied');
  fileUpload(req, res, (err) => {
    if (err) {
      return res.send({ok: false, message: 'Filetype not allowed'});
    } else {
      if (!req.file) return res.send({ok: false, message: 'Upload file first'});
      let data = req.body;
      data.file = req.file.path;
      db.saveLiteKyc({data: data, sessionid: req.session.user}).then(kyc => {
        if (kyc === 200) {
          return res.send({ok: true});
        } else {
          return res.send({ok: false});
        }
      });
    }
  });
});

app.post('/api/airdrop/litekyc/update', (req, res) => {
  if (!req.session.user) return res.send('Permission denied');
  db.updateLiteKyc({data: req.body, sessionid: req.session.user}).then(kyc => {
    if (kyc === 200) {
      return res.send({ok: true});
    } else {
      return res.send({ok: false});
    }
  })
});


module.exports = app;
