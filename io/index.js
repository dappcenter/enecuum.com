const dev = require(require.resolve('dotenv')).config();
const {app, server} = require('./server');
//require('./social/');
//require('./contractProvider');

server.listen(8081, '0.0.0.0');

console.log('started');
