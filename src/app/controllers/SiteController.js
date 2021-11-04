const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');
class SiteController {
    //[GET]/home
    index(req, res, next) {

        Course.find({})
            .then(courses => {
                res.render('home', { 
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);

    }
    //[GET]/search
    search(req, res) {
        var q = req.query.q;
    }
}
//Public ra ngoài
module.exports = new SiteController();
