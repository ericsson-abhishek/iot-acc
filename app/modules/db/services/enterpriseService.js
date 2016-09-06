var mongoose = require('mongoose');
var crypto = require("crypto-js");
mongoose.Promise = global.Promise;
var Enterprise = require('../models/enterprise');
var jwt = require('../../middleware/services/jwt.js');

var tokenService = require('./tokenService');


var createEnterprise = function (requestData) {
    console.log("Enter into insert Enterprise method " + JSON.stringify(requestData));

    var passwordObj = {};
    passwordObj.passswordHash = crypto.MD5(requestData.password).toString();
    requestData.password = passwordObj.passswordHash;

    var objToinsert = new Enterprise(requestData);

    console.log(objToinsert);
    //Saving the model instance to the DB
    return objToinsert.save();
}

var queryEnterpriseByFilter = function (fieldName, fieldValue) {
    console.log("Enter into query enterprise method with fieldName : " + fieldName + " and fieldValue : " + fieldValue);
    //Now querying those books which have less than 100 pages
    //Find API takes in a query condition, attributes in the document to be projected,
    //callback to be executed when the data is available.
    //console.log({ fieldName : { $eq: fieldValue } });
    var obj = {};
    obj[fieldName] = { $eq: fieldValue };
    return Enterprise.findOne(obj);
}

var validateEnterprise = function (username, password) {
    console.log("Enter into validateEnterprise Method");
    return new Promise(function(resolve,reject){
        queryEnterpriseByFilter("username", username).then(function (result, err) {
        if (err) {
            reject(undefined);
        }
        else {
            if (result === null) {
                console.log("no records found");
                reject(result);
            } else {
                var passwordObj = {};
                passwordObj.passswordHash = crypto.MD5(password).toString();
                //console.log("SSS");
                if (result.get("password") === passwordObj.passswordHash) {
                    console.log("success "+result.get("_id"));
                    resolve(result.get("_id"));
                } else {
                    console.log("password not matched");
                    reject("password not matched");
                }
            }
        }
    })
    });
}

module.exports.createEnterprise = createEnterprise;
module.exports.queryEnterpriseByFilter = queryEnterpriseByFilter;
module.exports.validateEnterprise = validateEnterprise;
