const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
