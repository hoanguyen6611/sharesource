const User = require('../models/User');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class UserController {
    //[GET]/users/sign-in
    signIn(req, res, next) {
        res.render('user/sign-in');
    }
    //[GET]/users/sign-up
    signUp(req, res, next) {
        res.render('user/sign-up');
    }
}
//Public ra ngoài
module.exports = new UserController();
