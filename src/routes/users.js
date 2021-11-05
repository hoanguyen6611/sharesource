const express = require('express');
// const passport = require('passport');
const router = express.Router();
const userController = require('../app/controllers/UserController');
router.get('/sign-in', userController.signIn);
router.post('/sign-in', userController.confirmSignIn);
router.get('/sign-up', userController.signUp);
router.post('/sign-up', userController.register);
module.exports = router;
