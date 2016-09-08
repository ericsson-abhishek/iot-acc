var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iotaccdb');

var crypto = require("crypto-js");

var enterpriseService = require("../services/enterpriseService");
var enterpriseData = { firstname: "Sudarsan",lastname: "Sahoo",username: "SudarsanSaho11o1111111", password : "SSS", email: "2sss@11111111111sss111111.com"};

enterpriseService.createEnterprise(enterpriseData).then(function(result){
    console.log(result);
}).catch(function(err){
    console.log(err);
});
// console.log("Before");
// console.log("After");
//  enterpriseService.validateEnterprise("rana","Kundu1").then(function(res,err)
//  {
//      console.log(res);
//  }).catch(function(err){
//      console.log(err);
//  });



// var promiseTest = new Promise(function(resolve,reject){
 
//  var isValid = false;

//  if(isValid){
//      resolve("Success");
//  } else {
//      reject("Failure");
//  }
// });

// promiseTest.then(function(success){
//     console.log("Promise Test is : "+success);
// }).catch(function(failure){
//     console.log("Promise Test is : "+failure);
// })