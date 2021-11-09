const handlebars = require('express-handlebars');
const express_handlebars_sections = require('express-handlebars-sections');
module.exports = function (app) {
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
}