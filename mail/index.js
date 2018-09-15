require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mail = require('./mailer');

app.use(bodyParser.json());

app.post('/mail/reg', (req, res) => {
  if (req.body) {
    let {email} = req.body;
    let data = {
      EMAIL: email
    };
    let isSended = mail.send('reg', data);
    isSended.then(msg => {
      res.send(msg);
    });
  }
});

app.post('/mail/kyc', (req, res) => {
  if (req.body) {
    let {email, firstName, lastName} = req.body;
    let data = {
      EMAIL: email,
      FIRST_NAME: firstName,
      LAST_NAME: lastName
    };
    let isSended = mail.send('kc', data);
    isSended.then(msg => {
      res.send(msg);
    });
  }
});

module.exports = app;
