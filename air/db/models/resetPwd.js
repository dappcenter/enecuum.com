const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  verificationCode: String
});


module.exports = mongoose.model('ResetPwd', userSchema);
