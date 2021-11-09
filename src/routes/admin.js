const express = require('express');
const router = express.Router();
const adminController = require('../app/controllers/AdminController');
const AuthMiddleware = require('../app/middlewares/AuthMiddleware');
router.get('/courses', adminController.courses);
router.get('/docs', adminController.docs);
router.get('/users', adminController.users);
router.get('/', adminController.index);
module.exports = router;
