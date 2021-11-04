const Course = require('../models/Course');
const Doc = require('../models/Doc');
const { mutipleMongooseToObject } = require('../../util/mongoose');
class MeController {
    //[GET]/me/stored/courses
    storedCourses(req, res, next) {
        // res.json(res.local._sort);
        let courseQuery = Course.find({});
        Promise.all([courseQuery,Course.countDocumentsDeleted()])
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
    //[GET]/me/trash/docs
    trashDocs(req, res, next) {
        Doc.findDeleted({})
            .then(docs => res.render('docs/trash-docs', { docs: mutipleMongooseToObject(docs) }))
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
    //[GET]/me/stored/docs
    storedDocs(req, res, next) {
        // res.json(res.local._sort);
        let docQuery = Doc.find({});
        Promise.all([docQuery,Doc.countDocumentsDeleted()])
            .then(([docs,deletedCount]) =>
            res.render('me/stored-docs', { 
                deletedCount,
                docs: mutipleMongooseToObject(docs), 
            })
            )
            .catch(next);
    }
    
}
//Public ra ngoài
module.exports = new MeController();
