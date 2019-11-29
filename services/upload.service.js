
const multer = require('multer');
const Media = require('./../models/media.model');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

const handleUpload = (req, res) => {

    let upload = multer({ storage: storage }).single('file');

    upload(req, res, function (err) {

        const file = req.file;


        if (req.fileValidationError) {

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
        else if (err instanceof multer.MulterError) {

            var result = {
                error: {
                    code: 'Bad_Request',
                    message: err
                },
                data: null
            }
            return res.status(400).json(result);

        }
        else if (err) {
            var result = {
                error: {
                    code: 'Bad_Request',
                    message: err
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

    });

}

const getDetailFile = (file) => {
    var file = {
        mimetype: file.mimetype,
        encoding: file.encoding,
        uri: file.path,
        type: file.mimetype,
        duration: file.size,
        status: 'PENDING'
    }
    return file;
}

module.exports = {
    handleUpload: handleUpload
}