const path = require('path');
const express = require('express');
// const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const express_handlebars_sections = require('express-handlebars-sections');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const userController = require('./app/controllers/UserController');
// const SortMiddleware = require('./app/middlewares/SortMiddleware');
//Connect to DB server
db.connect();
app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
// app.use(morgan('combined'));
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    //   secure: true 
    maxAge: 600000
    }
}))
// dùng với phương thức post để lấy ra những cái tương tự parameter
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.json());
// require('./app/middlewares/LocalMiddleware')(app);
app.use( function(req, res, next) {
    if (req.session.isAuthenticated===null) {
        req.session.isAuthenticated = false;
    }
    res.locals.lcIsAuthenticated = req.session.isAuthenticated;
    res.locals.lcAuthUser = req.session.authUser;
    next();
});
// Handlers template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
            section: express_handlebars_sections(),
        },
    }),
);
// app.use(SortMiddleware);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));
// route init
route(app);
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
