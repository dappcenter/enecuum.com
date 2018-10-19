const mongoose = require('mongoose');

const kycSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  file: String,
  name: String,
  nation: String,
  birthDate: String,
  walletInfo: String,
  enqWallet: String,
  email: String
});


module.exports = mongoose.model('LiteKyc', kycSchema);
