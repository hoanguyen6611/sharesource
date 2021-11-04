const Learn = require('../models/Learn');
const {mutipleMongooseToObject} = require('../../util/mongoose');
class LearnController {
    //[GET]/learn
    index(req, res, next) {
        Learn.find({})
        .then(learns => {
            res.render('courses/learn', { 
                learns: mutipleMongooseToObject(learns)
            });
        })
        .catch(next);
    }
}
//Public ra ngoài
module.exports = new LearnController();
