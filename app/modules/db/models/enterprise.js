var mongoose = require('mongoose');

var enterpriseSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
    password: String,
    email: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true }
});

module.exports = mongoose.model('Enterprise', enterpriseSchema, "enterprise_details");