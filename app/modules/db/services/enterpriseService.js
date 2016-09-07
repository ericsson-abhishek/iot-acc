var mongoose = require('mongoose');
var crypto = require("crypto-js");
mongoose.Promise = global.Promise;
//using enterprise module
var Enterprise = require('../models/enterprise');
//using jwt token module
var jwt = require('../../middleware/services/jwt.js');
//using token service module
var tokenService = require('./tokenService');

//function to create an enterprise
var createEnterprise = function (requestData) {
    //console.log("Enter into insert Enterprise method " + JSON.stringify(requestData));
    //Logic to hashed the password before storing into DB
    var passwordObj = {};
    passwordObj.passswordHash = crypto.MD5(requestData.password).toString();
    //Replacing the password with hashed value
    requestData.password = passwordObj.passswordHash;
    //creating the instance of Enterprise schema
    var objToinsert = new Enterprise(requestData);
    //console.log(objToinsert);
    //Saving the model instance to the DB
    return objToinsert.save();
}

//function to query an enterprise by filter
//That is fieldName is the DB column and fieldValue is the value for that field by which you 
//want to query the Enterprise
var queryEnterpriseByFilter = function (fieldName, fieldValue) {
    //console.log("Enter into query enterprise method with fieldName : " + fieldName + " and fieldValue : " + fieldValue);
    var obj = {};
    obj[fieldName] = { $eq: fieldValue };
    //Querying the model instance from DB
    return Enterprise.findOne(obj);
}

//function to validate an enterprise with username and password after logged in
var validateEnterprise = function (username, password) {
    //Creating a promise to return the validation future object
    return new Promise(function(resolve,reject) {
    queryEnterpriseByFilter("username", username).then(function (result) {
    //checking for user existence in DB
    if(result !== null) {
    //Hashing the user passed password , so that we can compare with DB stored password    
    var passwordObj = {};
     passwordObj.passswordHash = crypto.MD5(password).toString();
    //console.log(result.get("password") === passwordObj.passswordHash);
         if(result.get("password") === passwordObj.passswordHash) {
            //console.log("Success" + result.get("_id"));
            resolve(result.get("_id"));
         } else {
            //password does not match
            reject("Invalid login credentials.");
            }
     } else {
            console.log("record not found");
            reject("Invalid login credentials.");
        }
    }).catch(function(err){
            console.log(err);
        });
    });
}

module.exports.createEnterprise = createEnterprise;
module.exports.queryEnterpriseByFilter = queryEnterpriseByFilter;
module.exports.validateEnterprise = validateEnterprise;
