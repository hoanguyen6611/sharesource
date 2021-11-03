const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Doc = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  author: { type: String, required: true},
  source: { type: String},
  file: { type: String, required: true },
  slug: { type: String,slug: 'name',unique:true },
}, {
  timestamps: true, //mặc định thêm thời gian tạo và thời gian update
});
// Add plugin
mongoose.plugin(slug);
Doc.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: 'all',
});
module.exports = mongoose.model('Doc', Doc);

