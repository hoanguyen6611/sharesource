const Course = require('../models/Course');
const {mongooseToObject} = require('../../util/mongoose');
class CourseController {
    //[GET]/course/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course =>{
                res.render('courses/show',{course: mongooseToObject(course)});
            })
            .catch(next);
    }
    //[GET]/course/create
    create(req, res, next) {
        res.render('courses/create');
    }
    //[GET]/course/store
    store(req, res, next) {
        const course = new Course(req.body);
        course.save();
        res.send('COURSE SAVED!!');
    }
}
//Public ra ngoài
module.exports = new CourseController();
