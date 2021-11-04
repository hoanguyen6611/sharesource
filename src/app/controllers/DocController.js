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
            .then(doc => {
                res.render('docs/show', { doc: mongooseToObject(doc) });
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
    //[GET]/docs/:id/edit
    edit(req, res, next) {
        Doc.findById(req.params.id)
            .then(doc => res.render('docs/edit', {
                doc: mongooseToObject(doc)
            }))
            .catch(next);
    }
    //[PUT]/course/:id
    update(req, res, next) {
        Doc.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/docs'))
            .catch(next);
    }
    
}
//Public ra ngoài
module.exports = new DocController();
