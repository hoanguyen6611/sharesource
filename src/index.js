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
// const SortMiddleware = require('./app/middlewares/SortMiddleware');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const session = require('express-session');
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
app.use(methodOverride('_method'));
app.use(express.json());
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
