const dev = require(require.resolve('dotenv')).config();
const {app, server} = require('./server');
require('./contractProvider');
const memwatch = require(require.resolve('memwatch-next'));
memwatch.on('leak', (info) => {
  console.error('Memory leak detected:\n', info);
  throw info;
});

memwatch.on('stats', (stats) => {
  //console.log('memwatch::stats');
  //console.log(stats);
});


server.listen(8081, '0.0.0.0');

console.log('started');
