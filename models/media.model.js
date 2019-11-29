let mongoose = require('mongoose');

const { Schema } = mongoose;

mongoose.Promise = require('bluebird');

const mediaSchema = new Schema({
    mimetype: String,
    encoding: String,
    uri: String,
    type: String,
    duration: String,
    thumbnail: String,
    filename: String,
    status: { type: String, default: 'PENDING' },
    uploadedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null},
    uid: {type: Schema.ObjectId}
});

module.exports = mongoose.model('Media', mediaSchema);