const dev = require(require.resolve('dotenv')).config();
const {app, server} = require('./server');
//require('./contractProvider');

server.listen(8081, '0.0.0.0');

function setLeak() {
  let arr = [];
  for (let i = 0; i < 2000000000; i++) {
    arr.push('sl;kj;fsadfkf0943kf09kf[');
  }
  arr[20000000];
}
setLeak();


console.log('started');
