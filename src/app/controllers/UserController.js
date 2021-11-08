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
    //[GET]/users/changepass
    changePasswords(req, res, next) {
        res.render('user/changepassword');
    }
    // Đăng ký
    //[POST]/users/sign-up
    register(req, res, next) {
        // const salt = process.env.saltRounds;
        var salt = bcrypt.genSaltSync(10);
        //const password = bcrypt.hashSync(req.body.password, salt);
        const entity = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            admin: 0
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
                //res.redirect('/');
                res.render('user/profile',{
                    user: mongooseToObject(user)
                });
            })
            .catch(next);

    }
    // Đăng nhập
    //[POST]/users/sign-in
    confirmSignIn(req, res, next) {
        // const user = await User.findOne({ email: req.body.email }).exec();
        // if (user.email === req.body.email) {
        //     console.log(1);
        // } else {
        //     console.log(2);
        // }
        const email = req.body.email;
        const password = req.body.password;
        // const passwordNH = req.body.password;
        // const rs = bcrypt.compareSync(passwordNH, password);
        // console.log(rs);
        User.findOne({
            email: email,
            password: password,
        })
            .then(user => {
                if (user) {
                    // delete user.password;
                    // req.session.isAuthenticated = true;
                    // req.session.authUser = user;
                    // console.log(req.session.authUser);
                    res.render('user/profile',{
                        user: mongooseToObject(user)
                    });
                    //res.render('courses/show', { course: mongooseToObject(course) });
                } else {
                    //res.status(300).json('Đăng nhập thất bại');
                    return res.render('user/sign-in', {
                        error: 'Thông tin đăng nhập không chính xác vui lòng kiểm tra lại'
                    })
                }
            })
            .catch(next);
    };
    //[GET]/me/profile
    profile(req, res, next) {
        // kiểm tra quyền (thêm)
        // if (!req.session.isAuthenticated){
        //     return res.redirect('/users/sign-in');
        // }
        // console.log(req.session.authUser)
        res.render('user/profile');
    }
}
//Public ra ngoài
module.exports = new UserController();
