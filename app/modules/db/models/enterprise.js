var mongoose = require('mongoose');

//Used for unique validator
var uniqueValidator = require('mongoose-unique-validator');

var enterpriseSchema = new mongoose.Schema({
    firstname: { type: String, trim: true },
    lastname: { type: String, trim: true },
    username: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
    password: { type: String, trim: true },
    account_status:{ type: String, lowercase: true,trim: true, default : "inactive"},
    email: { type: String, unique: true, required: true, dropDups: true, lowercase: true, trim: true },
    activation_hash:{ type: String,trim: true},
    creation_timestamp :{ type : Date, default: Date.now },
    send_activation_email_timestamp :{ type : Date, default: null},
    activation_timestamp :{ type : Date, default: null}
});

enterpriseSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Enterprise', enterpriseSchema, "enterprise_details");