const userController = require('../../controllers/apis/user');
const uploadController = require('../../controllers/apis/upload');

const express = require('express');
let router = express.Router();
router.use('/users', userController);
router.use('/upload', uploadController);
module.exports = router;