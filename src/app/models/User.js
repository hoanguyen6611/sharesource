const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
const User = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});
// User.methods.encryptPassword= function(password){
//   return bcrypt.hashSync(password, bcrypt.genSaltSync(5),null);
// };
// User.methods.validPassword = function(password){
//   return bcrypt.compareSync(password, this.password);
// };
module.exports = mongoose.model('User', User);

