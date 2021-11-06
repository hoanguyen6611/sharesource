const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
// const port = process.env.PORT || 3000;
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const session = require('express-session');
// const SortMiddleware = require('./app/middlewares/SortMiddleware');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const flash = require('connect-flash');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(session({
//     secret: 'mysecret',
//     resave: false,
//     saveUninitialized: false,
// }))
// app.use(flash());
// app.use(passport.initialize());
// app.use(passport.session());
//Connect to DB server
db.connect();
// require('./config/pass/passport'); 
app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
// app.use(morgan('combined'));
// dùng với phương thức post để lấy ra những cái tương tự parameter
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(async function(req, res, next) {
    // if (req.session.isAuthenticated===null) {
    //     req.session.isAuthenticated=false;
    // }
    // res.locals.lcIsAuthenticated=req.session.isAuthenticated;
    // res.locals.lcAuthUser= req.session.authUser;
    // next();
    // console.log(req.session.isAuthenticated);
})
app.use(methodOverride('_method'));
app.use(express.json());
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    //   secure: true 
    }
}))
// Handlers template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        }
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
