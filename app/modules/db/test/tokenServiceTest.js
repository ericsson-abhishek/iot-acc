var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/iotaccdb');
var jwt = require("../../middleware/services/jwt");

var TokenService = require("../services/TokenService");
//var TokenData = {id:"token101",enterpriseNumber:"cus101",username:"Avishek",password:"Avishek"};
// TokenService.createToken("57cd576b895e3cf05fbe1450").then(function(res, err) {
//     return TokenService.findToken("57cd576b895e3cf05fbe1450")
// }).then(function(res, err) {
//     console.log(res);
// });

jwt.generateJWTtoken("AAA","OAUTH").then(function(res,err){
    console.log(res);
});