const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Learn = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  slug: { type: String,slug: 'name',unique:true },
  videoId: { type: String, required: true },
  level: { type: String },
}, {
  timestamps: true, //mặc định thêm thời gian tạo và thời gian update
});
// Add plugin
mongoose.plugin(slug);
Learn.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Learn', Learn);

