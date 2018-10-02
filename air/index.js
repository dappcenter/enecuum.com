const dev = require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const app = express();
const db = require('./db/db');
const crypto = require('crypto');
const multer = require('multer');
const mail = require('./../mail/mailer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './air/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + file.originalname);
  }
});
const upload = multer({storage: storage});

app.use(cookieSession({
  name: 'supersession',
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

app.post('/api/airdrop/update', (req, res) => {
  if (!req.session.user) return res.send('Permission denied');
  if (req.body.f) {
    console.log(req.session.user);
    return db.updateUser({t: req.body.t, sessionid: req.session.user}).then(user => {
      console.log('user: ', user);
      if (user !== 400) {
        res.send({ok: true, total: user.total});
      } else {
        res.send({ok: false});
      }
    });
  } else {
    res.send('fail');
  }
});

app.post('/api/airdrop/registration', (req, res) => {
  if (!req.body.name && !req.body.surname && !req.body.email && !req.body.password && !req.body.country) {
    return res.send({
      ok: false,
      message: 'Some fields are empty'
    });
  }
  const pwd = crypto.createHash('sha256').update(process.env.SESS_KEY_SIGN + req.body.password + process.env.SESS_KEY_VERIFY).digest('base64');
  const id = crypto.createHash('sha256').update(new Date().getTime() + Math.random() * 9999 + (process.env.SESS_KEY_SIGN + process.env.SESS_KEY_VERIFY)).digest('base64');
  req.body.password = pwd;
  req.body.id = id;
  return db.getUser(req.body).then(user => {
    console.log(user);
    if (user) {
      return res.send({ok: false, message: 'Email already exist'});
    } else {
      console.log('not exist');
      let isSended = mail.send('ad', {
        EMAIL: req.body.email,
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
          return res.send({ok: false, message: 'Address domain not found. Please use another email address.'});
        }
      });
    }
  });
});

app.post('/api/airdrop/login', (req, res) => {
  if (req.session.user && (!req.body.email && !req.body.password)) {
    return db.restoreUser(req.session.user).then(user => {
      if (user !== 400 && user) {
        return res.send({ok: true, message: user});
      } else {
        delete req.session.user;
      }
    });
  }
  console.log('after session');
  if (!req.body.email || !req.body.password) {
    return res.send({
      ok: false,
      message: 'Some fields are empty'
    });
  }
  console.log('before getuser');
  const pwd = crypto.createHash('sha256').update(process.env.SESS_KEY_SIGN + req.body.password + process.env.SESS_KEY_VERIFY).digest('base64');
  req.body.password = pwd;
  console.log('after get pwd', process.env);
  return db.getUser(req.body).then(user => {
    console.log('in promise getting user', user);
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

app.post('/api/airdrop/litekyc', upload.single('file'), (req, res) => {
  if (!req.session.user) return res.send('Permission denied');
  let data = req.body;
  data.file = req.file.path;
  db.saveLiteKyc({data: data, sessionid: req.session.user}).then(kyc => {
    if (kyc === 200) {
      return res.send({ok: true});
    } else {
      return res.send({ok: false});
    }
  });
});

module.exports = app;
