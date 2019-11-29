const userController = require('../../controllers/apis/user');
const uploadController = require('../../controllers/apis/upload.controller');


const express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken');
//Middleware

function verifyBearerToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, '548246b2-eaf5-4a07-955c-e3ae2251d0e9', { algorithms: ['HS256'] }, (err, payload) => {
            if (err) return reject(err);
            return resolve(payload);
        });
    });
};


function authenticateMiddleware(req, res, next) {
    const token = req.headers['x-access-token'];
    verifyBearerToken(token).then(result => {
        if (result) {
            req.uid = result.uid;
            next();
        }
    }).catch(error => {
        var result = {
            error: {
                code: 401,
                message: error.message
            },
            data: null
        }
        return res.status(401).json(result);
    })
}

router.use('/upload', authenticateMiddleware, uploadController.handleUpload);
module.exports = router;