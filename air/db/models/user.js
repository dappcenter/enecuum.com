const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id: String,
  name: String,
  surname: String,
  email: String,
  password: String,
  country: String,
  kyc: {
    type: Boolean,
    default: false
  },
  twitter: {
    type: Boolean,
    default: false
  },
  facebook: {
    type: Boolean,
    default: false
  },
  linkedin: {
    type: Boolean,
    default: false
  },
  telegram: {
    type: Boolean,
    default: false
  },
  emailpro: {
    type: Boolean,
    default: true
  },
  total: {
    type: Number,
    default: 0
  }
});


module.exports = mongoose.model('User', userSchema);
