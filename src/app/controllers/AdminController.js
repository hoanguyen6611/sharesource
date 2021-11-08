const Course = require('../models/Course');
const Doc = require('../models/Doc');
const User = require('../models/User');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class SiteController {
    //[GET]/admin
    index(req, res) {
        res.render('admin/admin');
    }
    //[GET]/admin/courses
    courses(req, res,next) {
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
