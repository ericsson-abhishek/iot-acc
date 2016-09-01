var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iotaccdb');

var enterpriseService = require("../services/enterpriseService");
var enterpriseData = {number:"cus101",username:"Avishek",password:"Avishek",email:"abhishek@choudhury.com"};

enterpriseService.createEnterprise(enterpriseData);

