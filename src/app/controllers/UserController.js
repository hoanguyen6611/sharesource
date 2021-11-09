const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const passport = require('passport');
const localPassport = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const md5 = require('md5');
class UserController {
    //[GET]/users/sign-in
    signIn(req, res, next) {
        res.render('user/sign-in');
    }
    //[GET]/users/sign-up
    signUp(req, res, next) {
        res.render('user/sign-up');
    }
    //[GET]/users/changepass
    changePasswords(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        res.render('user/changepassword');
    }
    // Đăng ký
    //[POST]/users/sign-up
    register(req, res, next) {
        const password = md5(req.body.password);
        const entity = {
            name: req.body.name,
            email: req.body.email,
            password
        };
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user !== null) {
                    return res.render('user/sign-up', {
                        error: 'Email đã đăng ký'
                    })
                }
                else {
                    const user = new User(entity);
                    return user.save();
                }
            })
            .then(user => {
                res.redirect('/users/sign-in');
            })
            .catch(next);

    }
    //[POST]/users/sign-in -- đăng nhập
    confirmSignIn(req, res, next) {
        const email = req.body.email;
        const password = md5(req.body.password);
        User.findOne({
            email: email,
            password: password,
        })
            .then(user => {
                if (user) {
                    req.session.isAuthenticated = true;
                    req.session.authUser = user;
                    res.render('user/profile');
                } else {
                    return res.render('user/sign-in', {
                        error: 'Thông tin đăng nhập không chính xác vui lòng kiểm tra lại'
                    })
                }
            })
            .catch(next);
    };
    //[GET]/users/profile
    profile(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        console.log(req.session.authUser);
        res.render('user/profile');
    }
    //[POST]/users/logout
    logout(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        req.session.isAuthenticated =false;
        req.session.authUser =null;
        res.redirect(req.headers.referer);
    }
    //[POST]/users/changepass
    changePass(req, res, next) {
        // if (!req.session.isAuthenticated){
        //     return res.redirect('/users/sign-in');
        // }
        // var passwordOld = md5(req.body.passwordOld);
        // var passwordNew = md5(req.body.passwordNew);
        // User.find({email: req.session.authUser.email})
        //     .then(user =>{
        //         if(user.password === passwordOld){
        //             user.password = passwordNew;
        //             res.redirect('/users/profile');
        //         }
        //         return res.redirect('/users/changepass', {
        //             error: 'Mật khẩu cũ không chính xác vui lòng kiểm tra lại'
        //         })
                
        //     })
    }
}
//Public ra ngoài
module.exports = new UserController();
