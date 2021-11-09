const Course = require('../models/Course');
const Doc = require('../models/Doc');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class SiteController {
    //[GET]/admin
    index(req, res) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        res.render('admin/admin');
    }
    //[GET]/admin/courses
    courses(req, res,next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        Course.find({})
            .then(courses => {
                res.render('admin/courses', { 
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }
    //[GET]/admin/docs
    docs(req, res,next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        Doc.find({})
            .then(docs => {
                res.render('admin/docs', { 
                    docs: mutipleMongooseToObject(docs)
                });
            })
            .catch(next);
    }
    //[GET]/admin/user
    users(req, res,next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        User.find({})
            .then(users => {
                res.render('admin/user', { 
                    users: mutipleMongooseToObject(users)
                });
            })
            .catch(next);
    }
}
//Public ra ngoài
module.exports = new SiteController();