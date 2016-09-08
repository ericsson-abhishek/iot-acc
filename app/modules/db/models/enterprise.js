var mongoose = require('mongoose');
//Used for unique validator
var uniqueValidator = require('mongoose-unique-validator');

var enterpriseSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
    password: String,
    email: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true }
});

enterpriseSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Enterprise', enterpriseSchema, "enterprise_details");