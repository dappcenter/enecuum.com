const dev = require(require.resolve('dotenv')).config();
const {app, server} = require('./server');
require('./contractProvider');

server.listen(8081, '0.0.0.0');

console.log('started');

app.get('/ping', (req, res) => {
  res.send("i'm live man");
});
