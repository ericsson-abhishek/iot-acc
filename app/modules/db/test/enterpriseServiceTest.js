var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iotaccdb');

var enterpriseService = require("../services/enterpriseService");
var enterpriseData = { username: "sahoo", password: "Avishek", email: "abhishek@choudhury.com" };

enterpriseService.createEnterprise(enterpriseData);
//enterpriseService.queryEnterpriseByEmail("abhishek@choudhury.com");