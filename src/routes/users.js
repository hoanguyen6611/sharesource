const express = require('express');
// const passport = require('passport');
const router = express.Router();
const userController = require('../app/controllers/UserController');
const restrict = require('../app/middlewares/AuthMiddleware')
router.get('/sign-in', userController.signIn);
router.post('/sign-in', userController.confirmSignIn);
router.get('/sign-up', userController.signUp);
router.post('/sign-up', userController.register);
router.get('/profile', userController.profile);
module.exports = router;
