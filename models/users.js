const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  backlog: Array,
  nowPlaying: Array,
  finished: Array,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
