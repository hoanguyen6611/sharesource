const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class CourseController {

    //[GET]/course
    showAll(req, res,next){
        Course.find({})
            .then(courses => {
                res.render('courses/courses', { 
                    courses: mutipleMongooseToObject(courses)
                });
            })
            .catch(next);
    }
    //[GET]/course/:slug
    showItems(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) });
            })
            .catch(next);
    }
    //[GET]/course/create
    create(req, res, next) {
        res.render('courses/create');
    }
    //[GET]/course/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {

            })
    }
    //[GET]/course/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }
    //[PUT]/course/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //[DELETE]/course/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH]/course/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE]/course/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[POST]/course/handle-form
    handleForm(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json('Không có hành vi');
        }
    }
    //[POST]/course/trash-all
    trashAll(req, res, next) {
        switch (req.body.action) {
            case 'deleteForce':
                Course.deleteOne({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restoreAll':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json('Không có hành vi');
        }
    }
}
//Public ra ngoài
module.exports = new CourseController();
