const mysql = require(require.resolve('mysql'));
const request = require(require.resolve('request'));
const BigNumber = require(require.resolve('bignumber.js'));

let pool = mysql.createPool({
  connectionLimit: 20,
  user: process.env.DB_USER_SITE,
  password: process.env.DB_PASSWORD_SITE,
  host: process.env.DB_HOST_SITE,
  database: process.env.DB_NAME_SITE
});

/*function query({sender, token}) {
  return new Promise(resolve => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err.stack);
        connection.release();
        return;
      }
      console.log('connected to pool');
      console.log('write to db:', {
        sender: sender,
        token: token
      });
      let initialAmountQuery = "SELECT u.balance FROM users AS u JOIN kyc AS k ON u.id = k.user_id LEFT JOIN kyc_individual AS i ON (k.accountType = 1 AND u.id = i.user_id) LEFT JOIN kyc_company AS c ON (k.accountType = 2 AND u.id = c.user_id) WHERE k.accountType IS NOT NULL AND (EXISTS(SELECT i.user_id FROM kyc_individual AS i WHERE i.user_id = u.id) OR EXISTS(SELECT c.user_id FROM kyc_company WHERE c.user_id = u.id)) AND k.status = 4 AND (i.ethWalletNumber = '" + sender + "' OR c.ethWalletNumber = '" + sender + "') ORDER BY u.id ASC LIMIT 1";
      connection.query(initialAmountQuery, (error, res) => {
        try {
          console.log('get current balance: ', res);
          if (res) {
            let initialAmount = parseInt(res[0].balance) ? parseInt(res[0].balance) : null;
            console.log(BigNumber(initialAmount).toNumber(), BigNumber(token).shiftedBy(10).toNumber(), BigNumber(initialAmount).plus(BigNumber(token).shiftedBy(10)).toNumber());
            let query = "UPDATE users AS u JOIN kyc AS k ON u.id = k.user_id LEFT JOIN kyc_individual AS i ON (k.accountType = 1 AND u.id = i.user_id) LEFT JOIN kyc_company AS c ON (k.accountType = 2 AND u.id = c.user_id) SET u.balance = '" + (BigNumber(initialAmount).isNaN() ? BigNumber(token).shiftedBy(10) : BigNumber(initialAmount).plus(BigNumber(token).shiftedBy(10))) + "' WHERE k.accountType IS NOT NULL AND (EXISTS(SELECT i.user_id FROM kyc_individual AS i WHERE i.user_id = u.id) OR EXISTS(SELECT c.user_id FROM kyc_company WHERE c.user_id = u.id)) AND k.status = 4 AND (i.ethWalletNumber = '" + sender + "' OR c.ethWalletNumber = '" + sender + "') ORDER BY u.id ASC LIMIT 1";
            connection.query(query, (err) => {
              resolve('ok');
              connection.release();
              if (err) console.log(err);
            })
          }
        } catch (e) {
          console.log('database query errror:', e);
          connection.release();
        }
      });
    });
  });
}

function setFirstBlock(block) {
  let id = process.env.dev ? 3 : 1;
  console.log('start writting block #' + block + ' to id ' + id);
  let query = "UPDATE eth SET blockNumber='" + block + "' WHERE id='" + id + "'";
  pool.getConnection((err, connection) => {
    console.log('get pool connection');
    if (err) {
      console.log('error database:', err.stack);
      connection.release();
      return;
    }
    connection.query(query, (error, res) => {
      if (error) {
        console.log('error block to db: ', error);
      }
      console.log('current block to db: ', res);
      connection.release();
    });
  });
}

pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});

pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});

function getFirstBlock() {
  let id = process.env.dev ? 3 : 1;
  return new Promise(resolve => {
    let query = "SELECT blockNumber FROM eth WHERE id='" + id + "'";
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err.stack);
        return;
      }
      connection.query(query, (error, res) => {
        console.log('current block from db: ', res);
        connection.release();
        resolve(res);
      });
    });
  });
}

function sendLog({tx, sender, ether, usd, token}) {
  console.log('SEND LOG!!!');
  request('https://api.enecuum.com/v1' + "/log?err=New Tx&url=https://" + (process.env.dev ? "ropsten." : "") + "etherscan.io/tx/" + tx + "&line=]&ua=data: " + ether + " ether from " + sender + " (" + usd + " usd / " + BigNumber(token).toFixed(10) + " enq)", (err, res) => {
    if (err) console.log(err);
  });
}

function sendPureLog(data) {
  request('https://api.enecuum.com/v1' + "/log?err=Info&url=[&line=]&ua=data: " + data, (err, res) => {
    if (err) console.log(err);
  });
}*/

function getUsers(status = 3) {
  return new Promise(resolve => {
    let query = "SELECT IFNULL(i.ethWalletNumber, c.ethWalletNumber) AS wallet FROM users AS u JOIN kyc AS k ON u.id = k.user_id LEFT JOIN kyc_individual AS i ON (k.accountType = 1 AND u.id = i.user_id) LEFT JOIN kyc_company AS c ON (k.accountType = 2 AND u.id = c.user_id) WHERE k.status = " + status;
    pool.getConnection((err, connection) => {
      if (err) {
        console.log('error:', err.stack);
        return;
      }
      connection.query(query, (error, res) => {
        connection.release();
        resolve(res);
      });
    });
  });
}

module.exports = {
  getUsers
};
