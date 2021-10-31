const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    //[GET]/me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find(),Course.countDocumentsDeleted()])
            .then(([courses,deletedCount]) =>
            res.render('me/stored-courses', { 
                deletedCount,
                courses: mutipleMongooseToObject(courses), 
            })
            )
            .catch(next);
    }
    //[GET]/me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', { courses: mutipleMongooseToObject(courses) }))
            .catch(next);
    }
    //[GET]/me/sign-in
    signIn(req, res, next) {
        res.render('me/sign-in');
    }
    //[GET]/me/sign-up
    signUp(req, res, next) {
        res.render('me/sign-up');
    }
    //[GET]/me/stored/news
    writeNews(req, res, next) {
        res.render('me/stored-news');
    }
    //[GET]/me/stored/news
    writeMess(req, res, next) {
        res.render('me/stored-mess');
    }
    
}
//Public ra ngoài
module.exports = new MeController();
