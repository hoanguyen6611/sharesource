const express = require('express');
const router = express.Router();
const postsController = require('../app/controllers/PostController');
router.get('/blog', postsController.blog);
router.get('/question', postsController.question);
router.get('/sharecode', postsController.shareCode);
router.get('/:slug', postsController.show);
router.get('/',postsController.index);
module.exports = router;
