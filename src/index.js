const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;
const route = require('./routes');

app.use(express.static(path.join(__dirname, 'public')));
// HTTP logger
// app.use(morgan('combined'));
// dùng với phương thức post để lấy ra những cái tương tự parameter
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
// Handlers template engine
                  app.engine(
                      'hbs',
                      handlebars({
                          extname: '.hbs',
                      }),
                  );
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
