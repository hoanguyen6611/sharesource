const express = require('express');
const router = express.Router();
const uploadController = require('../app/controllers/UploadController');
router.post('/', uploadController.uploadSingleFile);
module.exports = router;