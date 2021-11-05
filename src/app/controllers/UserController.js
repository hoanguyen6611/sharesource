const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const passport = require('passport');
const localPassport = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
class UserController {
    //[GET]/users/sign-in
    signIn(req, res, next) {
        res.render('user/sign-in');
    }
    //[GET]/users/sign-up
    signUp(req, res, next) {
        res.render('user/sign-up');
    }
    //[POST]/users/sign-in
    logIn(req, res, next) {
       
    }
    //[POST]/users/sign-up
    register(req, res, next) {
        const salt = process.env.saltRounds;
        const password = bcrypt.hashSync(req.body.password, salt);
        const entity = {
            name: req.body.name,
            email: req.body.email,
            password,
            admin:0
        };
        const user = new User(entity);
        user.save()
            .then(() => res.redirect('/'))
            .catch(error => {
                res.redirect('404page')
            })
    }
    //[POST]/users/sign-in
    confirmSignIn (req, res, next){

    }
}
//Public ra ngoài
module.exports = new UserController();
