const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  slug: { type: String },
  videoId: { type: String, required: true },
  level: { type: String },
}, {
  timestamps: true,
});
module.exports = mongoose.model('Course', Course);

