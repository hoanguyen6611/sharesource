const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/siteController');
router.get('/search', siteController.search);
router.get('/introduce', siteController.introduce);
router.get('/', siteController.index);
module.exports = router;
