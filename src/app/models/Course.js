const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const Course = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  slug: { type: String,slug: 'name' },
  videoId: { type: String, required: true },
  level: { type: String },
}, {
  timestamps: true, //mặc định thêm thời gian tạo và thời gian update
});
module.exports = mongoose.model('Course', Course);

