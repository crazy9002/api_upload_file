const express = require('express');
const uploadService = require('../../services/upload.service');
let router = express.Router();
const HDFSStorage = require('./../../storage/hdfs');
const multer = require('multer');
const opts = {
    user: "hadoop",
    host: "104.46.232.114",
    port: 50070,
    path: "/webhdfs/v1",
    destination: "/tmp"
};

const storage = HDFSStorage.storage(opts);

const upload =  multer({ storage: storage}).single('file');

const insertMedia = ()=>{
    console.log('write Database')
    
}


const handleUpload = (req, res) => {

}

router.post('/', upload, insertMedia);

module.exports = router;