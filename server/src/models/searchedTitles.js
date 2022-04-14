const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchTitleSchema = new Schema({
  user_id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

const SearchTitles = mongoose.model('searchedTitle', SearchTitleSchema);

module.exports = SearchTitles;
