const {spawn} = require('child_process');
const {sendPureLog} = require('./informer');

function restart() {
  let mainInstance = spawn('node', ['./index.js']);
  mainInstance.on('close', (e) => {
    setTimeout(() => {
      console.log(`server was close with code: ${e}`);
      sendPureLog(`server was restarted with code: ${e}`);
      restart();
    }, 5000);
  });
  mainInstance.stdout.on('data', (data) => {
    console.log(data.toString());
  });
}

restart();
console.log('start main instance');
