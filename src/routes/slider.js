const express = require('express');
const router = express.Router();
const slidersController = require('../app/controllers/SliderController');
router.get('/', slidersController.index);
module.exports = router;
