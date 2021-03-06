var mongoose = require('mongoose');
var Token = require('../models/token');
var crypto = require("crypto-js");

var createToken = function(token) {
    console.log("Enter into create Token method "+JSON.stringify(token));
    var tokenObj = {};
    tokenObj.tokenHash = crypto.MD5(token).toString();
    tokenObj.expiryTime = new Date();
    var objToinsert = new Token(tokenObj);

    console.log(objToinsert);
    //Saving the model instance to the DB
    return objToinsert.save();
}

var findToken = function(token) {
    //console.log("Enter into create Token method "+JSON.stringify(requestData));
    // tokenObj = {};
    var tempTokenHash = crypto.MD5(token).toString();
    //tokenObj.expiryTime = new Date();
    // var objToinsert = new Token(tokenObj);

    //console.log(objToinsert);
    //Saving the model instance to the DB
    return Token.findOne({ tokenHash: { $eq: tempTokenHash } });
}

var deleteToken = function(token) {
    //console.log("Enter into create Token method "+JSON.stringify(requestData));
    // tokenObj = {};
    var tempTokenHash = crypto.MD5(token).toString();
    //tokenObj.expiryTime = new Date();
    // var objToinsert = new Token(tokenObj);

    //Saving the model instance to the DB
    return Token.remove({ tokenHash: { $eq: tempTokenHash } }).exec();
}


module.exports.createToken = createToken;
module.exports.findToken = findToken;
module.exports.deleteToken = deleteToken;

