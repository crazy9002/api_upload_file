const express = require('express');
const uploadService = require('../../services/upload');
let router = express.Router();

router.get('/', uploadService.handleUpload);

module.exports = router;