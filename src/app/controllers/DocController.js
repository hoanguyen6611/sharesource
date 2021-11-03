const Doc = require('../models/Doc');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class DocController {
    //[GET]/home
    index(req, res, next) {
        Doc.find({})
        .then(docs => {
            res.render('docs', { 
                docs: mutipleMongooseToObject(docs)
            });
        })
        .catch(next);
    }
    //[GET]/docs/:slug
    showItems(req, res, next) {
        Doc.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('docs/show', { doc: mongooseToObject(course) });
            })
            .catch(next);
    }
    //[GET]/docs/create
    create(req, res, next) {
        res.render('docs/create');
    }
    //[GET]/docs/store
    store(req, res, next) {
        req.body.image = 'https://images-na.ssl-images-amazon.com/images/I/61XI8us3MCL.jpg';
        const doc = new Doc(req.body);
        doc.save()
            .then(() => res.redirect('/me/stored/docs'))
            .catch(error => {

            })
    }
    
}
//Public ra ngoài
module.exports = new DocController();
