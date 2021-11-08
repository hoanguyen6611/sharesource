const postsRouter = require('./posts');
const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const docsRouter = require('./docs');
const usersRouter = require('./users');
const uploadRouter = require('./upload');
const adminRouter = require('./admin');
function route(app) {
    app.use('/admin', adminRouter);
    app.use('/upload', uploadRouter);
    app.use('/posts', postsRouter);
    app.use('/users', usersRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/docs', docsRouter)
    app.use('/', siteRouter);
}
module.exports = route;
