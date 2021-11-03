const newsRouter = require('./news');
const meRouter = require('./me');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const docsRouter = require('./docs');
const usersRouter = require('./users');
function route(app) {
    app.use('/news', newsRouter);
    app.use('/users', usersRouter);
    app.use('/me', meRouter);
    app.use('/courses', coursesRouter);
    app.use('/docs',docsRouter)
    app.use('/', siteRouter);
}
module.exports = route;
