const Mongoosee = require('mongoose');
const schema = Mongoosee.Schema;

const UserSchema = new schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  imageUrl: { type: String, trim: true },
  created_at: { type: Date, default: Date.now },
});

const User = Mongoosee.model('User', UserSchema);

module.exports = User;
