const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  name: String,
  surname: String,
  email: String,
  password: String,
  country: String,
  enqWallet: String,
  verificationCode: String
});


module.exports = mongoose.model('WaitingRegister', userSchema);
