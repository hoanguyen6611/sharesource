const Course = require('../models/Course');
const { mongooseToObject } = require('../../util/mongoose');
class MeController {
    //[GET]/me/stored/course
    storedCourse(req, res, next) {
        res.render('search');
    }
}
//Public ra ngoài
module.exports = new MeController();
