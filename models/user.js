const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  nickname: {
    type: String,
    unique: true
  },
  salt: {
    type: String,
    unique: false
  },
  profileImage: {
    type: String,
    unique: false,
    default: "Basic.jpg"
  },
  score: {
    type: Number,
    unique: false,
    default: 0
  },
  currentDraw: {
    type: Boolean,
    default: false
  }
}, {
    collection: 'users',
    versionKey: false
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);