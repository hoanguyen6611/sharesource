const Course = require('../models/Course');
const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const PAGE_SIZE = 9;
class CourseController {

    //[GET]/course
    showAll(req, res, next) {
        var page = req.query.page;
        page = parseInt(page);
        if (page) {
            //get of page
            if(page<1){
                page=1;
            }
            var skiper = (page-1)*PAGE_SIZE;
            Course.find({})
                .skip(skiper)
                .limit(PAGE_SIZE)
                .then(courses => {
                    Course.countDocuments({})
                        .then((total)=>{
                            // console.log(total);
                            var totalPage = Math.ceil(total/PAGE_SIZE);
                            const data = courses;
                            //console.log(totalPage);
                            //console.log(data);
                            res.render('courses/courses', {
                                courses: mutipleMongooseToObject(courses),
                                totalPage: totalPage,
                                total: total,
                                data:data
                            });
                        });
                    
                })
                .catch(next);
        } else {
            //get all courses
            Course.find({})
                .then(courses => {
                    res.render('courses/courses', {
                        courses: mutipleMongooseToObject(courses)
                    });
                })
                .catch(next);
        }
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
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        res.render('courses/create');
    }
    //[GET]/course/store
    store(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        req.body.userId = req.session.authUser.email;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {

            })
    }
    //[GET]/course/:id/edit
    edit(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
    }
    //[PUT]/course/:id
    update(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //[DELETE]/course/:id
    destroy(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE]/course/:id/force
    forceDestroy(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH]/course/:id/restore
    restore(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[POST]/course/handle-form
    handleForm(req, res, next) {
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
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
        if (!req.session.isAuthenticated){
            return res.redirect('/users/sign-in');
        }
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
    showFour(req, res,next){
        Course.find()
            .limit(4)
            .then(courses => {
                res.render('home',{
                    courses: mutipleMongooseToObject(courses)
                })
            })
            .catch(next);
    }
}
//Public ra ngoài
module.exports = new CourseController();
