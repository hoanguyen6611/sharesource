const Course = require('../models/Course');
const Doc = require('../models/Doc');
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
    search(req, res,next) {
        var key = req.query.q;
        //console.log(key.toLowerCase().indexOf(key.toLowerCase()) !== -1);
        let courseQuery = Course.find({name: { $regex: key }});
        let docsQuery = Doc.find({name: { $regex: key }});
        Promise.all([courseQuery, docsQuery])
            .then(([courses, docs]) =>
                res.render('search', {
                    courses: mutipleMongooseToObject(courses),
                    docs: mutipleMongooseToObject(docs),
                })
            )
            .catch(next);
    }
    //[GET]/search
    introduce(req, res,next) {
        res.render('introduce');
    }
}
//Public ra ngoài
module.exports = new SiteController();
