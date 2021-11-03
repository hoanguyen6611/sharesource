const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;
const Slider = new Schema({
  image: { type: String }
});
// Add plugin
module.exports = mongoose.model('Slider', Slider);

