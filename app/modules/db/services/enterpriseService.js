var mongoose = require('mongoose');
var moment = require('moment');
var crypto = require("crypto-js");
var uuid = require('uuid');

mongoose.Promise = global.Promise;
//using enterprise module
var Enterprise = require('../models/enterprise');
//using jwt token module
var jwt = require('../../middleware/services/jwt.js');
//using token service module
var tokenService = require('./tokenService');

var dayFromNow = function () {
    return moment().add(1, 'days').toDate();
};


//function to create an enterprise
var createEnterprise = function (requestData) {
    //console.log("Enter into insert Enterprise method " + JSON.stringify(requestData));
    //Logic to hashed the password before storing into DB
    var passwordObj = {};
    passwordObj.passswordHash = crypto.MD5(requestData.password).toString();
    //Replacing the password with hashed value
    requestData.password = passwordObj.passswordHash;
    //creating the instance of Enterprise schema
    //requestData.account_status= "inactive";
    // Generate a v1 (time-based) id 
    requestData.activation_hash = uuid.v1();
    requestData.send_activation_email_timestamp = dayFromNow();
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
var validateEnterprise = function (email, password) {
    //Creating a promise to return the validation future object
    return new Promise(function (resolve, reject) {
        queryEnterpriseByFilter("email", email).then(function (result) {
            //checking for user existence in DB
            if (result !== null) {
                //Hashing the user passed password , so that we can compare with DB stored password    
                if(result.account_status !== "active") {
                    reject("Account is not yet activated");
                } else {
                var passwordObj = {};
                passwordObj.passswordHash = crypto.MD5(password).toString();
                //console.log(result.get("password") === passwordObj.passswordHash);
                if (result.get("password") === passwordObj.passswordHash) {
                    //console.log("Success" + result.get("_id"));
                    resolve(result.get("_id"));
                } else {
                    //password does not match
                    reject("Invalid login credentials!");
                }
             }
            } else {
                console.log("record not found");
                reject("User Does Not Exist!");
            }
        }).catch(function (err) {
            console.log(err);
        });
    });
}


var activateEnterprise = function (input) {
    console.log("Enter into activae enterprise method " + input);
    return new Promise(function (resolve, reject) {
        queryEnterpriseByFilter("activation_hash", input).then(function (result) {
            //checking for user existence in DB
            //console.log(" record found is : "+result.result.n);
            if (result !== null) {
                var current = new Date();
                var send_activation_email_timestamp = result.send_activation_email_timestamp;
                console.log("Current Time : " + current + " activation : " + send_activation_email_timestamp);
                console.log(current < send_activation_email_timestamp);
                if (current < send_activation_email_timestamp) {
                    // resolve("Successfully Activated");
                    Enterprise.update({ activation_hash: { $eq: input } }, { $set: { account_status: "activate", activation_timestamp: current, activation_hash: null } }).then(function (act, err) {
                        console.log("Successfully Activated");
                        resolve("Successfully Activated");
                    });
                } else {
                    reject("Your Activation Link has been Expired"+result.activation_hash);
                }
            } else {
                //password does not match
                reject("Your Account is Already Activated.");
            }
        }).catch(function (err) {
            console.log(err);
        });
    });
};


var resendActivationEmail = function (input) {
    console.log("Enter into activae enterprise method " + input);
    return new Promise(function (resolve, reject) {
        queryEnterpriseByFilter("email", input).then(function (result) {
            //checking for user existence in DB
            //console.log(" record found is : "+result.result.n);
            if (result !== null) {
                var current = new Date();
                var send_activation_email_timestamp = result.send_activation_email_timestamp;
                var new_activation_hash = uuid.v1();
                if(current > send_activation_email_timestamp) {
                    // resolve("Successfully Activated");
                    Enterprise.update({ email: { $eq: input } }, { $set: { send_activation_email_timestamp : dayFromNow(), activation_hash : new_activation_hash } }).then(function (act, err) {
                        console.log("Successfully Updated send_activation_email_timestamp with current time");
                        resolve(result);
                    });
                 } else {
                     reject("Activation email already sent to your inbox.");
                 }   
            } else {
                //password does not match
                reject("Record not found");
            }
        }).catch(function (err) {
            console.log(err);
        });
    });
};


module.exports.createEnterprise = createEnterprise;
module.exports.queryEnterpriseByFilter = queryEnterpriseByFilter;
module.exports.validateEnterprise = validateEnterprise;
module.exports.activateEnterprise = activateEnterprise;
module.exports.resendActivationEmail = resendActivationEmail;