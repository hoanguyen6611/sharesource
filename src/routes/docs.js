const express = require('express');
const router = express.Router();
const docsController = require('../app/controllers/DocController');
router.get('/create', docsController.create);
router.post('/store', docsController.store);
router.get('/', docsController.index);
router.get('/:slug', docsController.showItems);
module.exports = router;
