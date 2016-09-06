var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iotaccdb');

var crypto = require("crypto-js");

var enterpriseService = require("../services/enterpriseService");
//var enterpriseData = { username: "Rana", password: "Kundu", email: "rana@choukundudhury.com" };

//enterpriseService.createEnterprise(enterpriseData);
// console.log("Before");
// enterpriseService.queryEnterpriseByFilter("username","rana").then(function(result, err){
//     if(err) {
//         throw err;
//     } else {
//         console.log(result);
//     }
// });
// console.log("After");
 enterpriseService.validateEnterprise("rana1","Kundu").then(function(res,err)
 {
     console.log(res);
     console.log(err);
 });
