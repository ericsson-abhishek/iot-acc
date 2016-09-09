var mongoose = require('mongoose');
//Used for unique validator
var uniqueValidator = require('mongoose-unique-validator');

var enterpriseSchema = new mongoose.Schema({
    firstname: { type: String, lowercase: true, trim: true },
    lastname: { type: String, lowercase: true, trim: true },
    username: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
    password: { type: String, trim: true },
    email: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true }
});

enterpriseSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Enterprise', enterpriseSchema, "enterprise_details");