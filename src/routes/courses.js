const express = require('express');
const router = express.Router();
const courseController = require('../app/controllers/CourseController');
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/trash-all',courseController.trashAll);
router.post('/handle-form',courseController.handleForm);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.destroy);
router.delete('/:id/force',courseController.forceDestroy);
router.get('/',courseController.showAll);
router.get('/:slug', courseController.showItems);
module.exports = router;
