const express = require('express');
const router = express.Router();
const learnController = require('../app/controllers/LearnController');
router.get('/', learnController.index);
module.exports = router;
