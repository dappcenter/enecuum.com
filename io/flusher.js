const {query} = require('./informer');

function Flusher() {
  this.pending = [];
  this.locked = false;
  this.setQuery = ({sender, token}) => {
    this.pending.push({sender, token});
    if (!this.locked) {
      this.locked = true;
      query(this.pending[0]);
      this.pending.splice(0, 1);
      console.log('outted');
    } else {
      console.log('waiting...');
      setTimeout(() => {
        console.log('waiting end');
        this.setQuery(this.pending[0]);
        if (this.locked) this.locked = false
      }, 5000);
    }
  }
}

let flusher = new Flusher();
module.exports = {
  flusher
}
