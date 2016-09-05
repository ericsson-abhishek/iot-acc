var mongoose = require('mongoose');
var Enterprise = require('../models/enterprise');
var Q = require('q');

var createEnterprise = function (requestData) {
    console.log("Enter into insert Enterprise method " + JSON.stringify(requestData));
    var objToinsert = new Enterprise(requestData);

    console.log(objToinsert);
    //Saving the model instance to the DB
    objToinsert.save(function (err, docsInserted) {
        if (err) throw err;
        console.log("Enterprise Saved Successfully " + docsInserted);
    });
}

var queryEnterprise = function (fieldName,fieldValue) {
    console.log("Enter into query enterprise method with fieldName : " + fieldName + " and fieldValue : "+fieldValue);
    //Now querying those books which have less than 100 pages
    //Find API takes in a query condition, attributes in the document to be projected,
    //callback to be executed when the data is available.
    return Enterprise.findOne({ fieldName: { $eq: fieldValue } });
}


module.exports.createEnterprise = createEnterprise;
module.exports.queryEnterprise = queryEnterprise;
