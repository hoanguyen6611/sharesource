const Slider = require('../models/Slider');
const {mutipleMongooseToObject} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class SliderController {
    //[GET]/home
    index(req, res, next) {
        Slider.find({})
        .then(sliders => {
            res.render('partials/slider', { 
                sliders: mutipleMongooseToObject(sliders)
            });
        })
        .catch(next);
    }
}
//Public ra ngoài
module.exports = new SliderController();
