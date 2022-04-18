const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const SearchTitleSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const SearchTitles = Mongoose.model('searchedTitle', SearchTitleSchema);

module.exports = SearchTitles;
