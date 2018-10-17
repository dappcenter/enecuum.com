const nodemailer = require('nodemailer');
const fs = require('fs');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_TLS,
  auth: {
    user: process.env.SMTP_LOGIN,
    pass: process.env.SMTP_PASS
  }
});

const confirmMail = ({code, email}) => {
  return new Promise(resolve => {
    fs.readFile('./air/templates/confirm.html', 'utf8', (err, file) => {
      let filteredHtml = file.replace('{confirmationString}', 'code=' + code.replace(' ', '+'));
      let mailOptions = {
        from: 'noreply@enecuum.com',
        to: email,
        subject: 'ENQ | Email confirmation',
        html: filteredHtml
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          console.log('sendmail error: ', err);
          resolve({ok: false});
        }
        resolve({ok: true});
      });
    });
  });
};

const recoveryMail = ({code, email}) => {
  return new Promise(resolve => {
    fs.readFile('./air/templates/restore.html', 'utf8', (err, file) => {
      let filteredHtml = file.replace('{confirmationString}', 'restore=' + code.replace(' ', '+'));
      let mailOptions = {
        from: 'noreply@enecuum.com',
        to: email,
        subject: 'ENQ | Recovery password',
        html: filteredHtml
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) {
          console.log('sendmail error: ', err);
          resolve({ok: false});
        }
        resolve({ok: true});
      });
    });
  });
};

module.exports = {
  confirmMail, recoveryMail
};
