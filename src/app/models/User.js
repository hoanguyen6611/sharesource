const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  image:{ type: String, required: true },
}, {
  timestamps: true, //mặc định thêm thời gian tạo và thời gian update
});
module.exports = mongoose.model('User', User);

