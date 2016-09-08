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



TokenService.findToken("11eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDEvVVhpd2t6YmNyOHhYRlJvQUMwOG5VYU9MWFlzdlR0VldDNkVYYlRCdWJPY0Q1bzdna2M3Mm9EbkJGYUZSdTNiTzhUejVpcjREcVN6Q1FMQ1JMVGNvaUdSOEVaWHZoSTdFPSIsImlhdCI6MTQ3MzMxOTkyMX0.Yk3pxF_5T0YpNurrzaBbzYoq0XBh6TP1OgU1ZvUD9UY").then(function(tokenHask){
    console.log(tokenHask);
}).catch(function(err){
    console.log(err);
})

// jwt.getUserInfoFromJWT("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6IlUyRnNkR1ZrWDE4N3V5dHVQWUV6V3ZnS1BzdG03ZHh1aC9PU3BvWDVVek5LQTJDVWZHNHhVYnc4cEQ1ZGJlQ2hUcXFoV1dLRmJTRkNFMi8wSjBWbFUrZUpSSzNWMlFpc0Q3bnA0Q2RBcFowPSIsImlhdCI6MTQ3MzMyMjI3M30.9dkcX6_trj4cfnGh1LvRULpqmHhny3m2DRK47zj46D4").then(function (res) {
//     console.log(res);
// }).catch(function (err) {
//     console.log(err);
// })
