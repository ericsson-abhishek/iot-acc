var mongoose = require('mongoose');

var tokenSchema = mongoose.Schema({
    //Also creating index on field id
    tokenHash: { type: String, index: true },
    expiryTime: Date
});

module.exports = mongoose.model('Token', tokenSchema, "token_details");