const HDFSStorage = require('./../../storage/hdfs');
const multer = require('multer');
const Media = require('./../../models/media.model');

const storage = HDFSStorage.storage({
    user: "hadoop",
    host: "104.46.232.114",
    port: 50070,
    path: "/webhdfs/v1",
    destination: "/tmp",
});

const handleUpload = (req, res) => {

    let upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');

    upload(req, res, function (err) {
        const file = req.file;
        if (err) {
            var result = {
                error: {
                    code: 'Not_Allowed_Extensions',
                    message: err.message
                },
                data: null
            }
            return res.status(400).json(result);
        } else if (req.fileValidationError) {

            var result = {
                error: {
                    code: 'Unprocessable_Entity',
                    message: req.fileValidationError
                },
                data: null
            }
            return res.status(422).json(result);
        }

        else if (!file) {

            var result = {
                error: {
                    code: 'Bad_Request',
                    message: 'Please select file'
                },
                data: null
            }
            return res.status(400).json(result);

        }

        let dataMedia = getDetailFile(file);
        dataMedia.uid = req.uid;

        const media = new Media(dataMedia);

        media.save().then((newMedia) => {
            var result = {
                error: null,
                data: newMedia
            }
            return res.status(200).json(result);
        }).catch((err) => {
            var result = {
                error: {
                    code: 500,
                    message: err.message
                },
                data: null
            }
            return res.status(500).json(result);
        });
    })
}

const getDetailFile = (file) => {
    var file = {
        mimetype: file.mimetype,
        encoding: file.encoding,
        uri: file.path,
        type: file.mimetype,
        duration: file.duration,
        filename: file.filename,
        status: 'PENDING'
    }
    return file;
}

const fileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(avi|mpg|flv|mp4|png)$/)) {
        return cb(new Error('Please upload a supported file Video '), false);
    }
    return cb(null, true);
}

module.exports = {
    handleUpload: handleUpload
};