const request = require('request');

const lists = {
  reg: 'KdFtUDXv0',
  kc: 'fAg3ovh9j',
  sb: 'LZysw0SR0',
  ad: 'VvF013GlS',
  wl: 'Qonag6BtT'
};

class Mail {
  /**
   *
   * @param apikey - apikey of service
   */
  constructor(apikey = '') {
    this.url = 'https://mail.enecuum.com';
    this.apikey = apikey
  }

  /**
   *
   * @param type - type of list data
   * @param data - query data
   */
  send(type, data) {
    data['MERGE_TAG_VALUE'] = 'no';
    data['FORCE_SUBSCRIBE'] = 'yes';
    return new Promise(resolve => {
      request.post({
        headers: {'content-type': 'application/json'},
        url: 'https://mail.enecuum.com/api/subscribe/' + lists[type] + '?access_token=' + this.apikey,
        body: JSON.stringify(data)
      }, (err, res) => {
        console.log(JSON.parse(res.body).error);
        if (JSON.parse(res.body).error) resolve({status: 400, message: JSON.parse(res.body).error});
        resolve({status: 200, message: 'success'});
      });
    })
  }
}

const mail = new Mail(process.env.MAIL_TOKEN);

module.exports = mail;
