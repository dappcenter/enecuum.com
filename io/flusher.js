const {query} = require('./informer');
const BigNumber = require(require.resolve('bignumber.js'));

async function flusher(arr, rate, TOKEN_PRICE) {
  let tmpArr = [];
  let queryArray = [];
  arr.forEach((item, index) => {
    if (typeof tmpArr[item.from] == 'undefined') {
      tmpArr[item.from] = 0;
    }
    tmpArr[item.from] = BigNumber(tmpArr[item.from]).plus(BigNumber(item.amount)).toNumber();
  });

  for (let i in tmpArr) {
    queryArray.push({
      sender: i,
      token: BigNumber(BigNumber(BigNumber(tmpArr[i]).dividedBy(BigNumber("1e18")).toNumber()).multipliedBy(rate).dividedBy(1000).toNumber()).dividedBy(TOKEN_PRICE).toNumber(),
    })
  }
  let i = 0;
  while (i < queryArray.length) {
    await query({
      sender: queryArray[i].sender,
      token: queryArray[i].token,
    });
    i++;
  }
}

module.exports = {
  flusher
}
