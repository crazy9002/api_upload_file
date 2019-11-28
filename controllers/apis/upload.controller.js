const express = require('express');
const uploadService = require('../../services/upload.service');
let router = express.Router();

router.get('/', uploadService.handleUpload);

module.exports = router;