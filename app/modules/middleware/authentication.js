//Used enterprise module
var enterpriseService = require("../db/services/enterpriseService");

var jwt = require("./services/jwt");
var tokenService = require("../../modules/db/services/tokenService");

//Printing some info about the request by middleware
var authenticate = function authenticate(req, res, next) {
    console.log(req.get("email"));
    if (req.get("email") === undefined) {
        res.status(403);
    }
    console.log("Before DB Call");
    enterpriseService.queryEnterpriseByFilter("email",req.get("email")).then(function (result, err) {
        console.log("In callback method");
        if (err) {
            console.log("Internal error occured");
            res.status(500);
        }
        else {
            console.log("Queried sucessfully" + result);
            if (typeof result !== 'undefined' && result) {
                console.log("Success");
                res.status(200);
                next();
            }
            else {
                console.log("Failure");
                res.status(403);
            }
        }
    });
}


var authenticateUser = function authenticateUser(req, res, next) {
   console.log("Inside atheticate method "+ req.body.username +" "+req.body.password);
   enterpriseService.validateEnterprise(req.body.username,req.body.password).then(function(result,err){
           if(err) {
              console.log("Inside if ");
              return res.status(401).send();
           }
           console.log("Inside callback of validateEnterprise " + err);
           jwt.generateJWTtoken(result,"OAUTH").then(function(res,err){
           tokenService.createToken(res).then( function(res,err) {
                 res.header("Authorization","Bearer "+res).status(200).send();
                });
           });
           next();
   }).catch(function(err){
               console.log(err);
               res.status(401).send();
           });
}
    
// var validateUser = function validateUser(req, res, next) {
//   var isValid = false;  
//   console.log(req.body.username);
//      enterpriseService.queryEnterpriseByFilter("username",req.body.username).then(function (result, err) {
//          if(err)
//          {
//              return res.status(401).send();
//          }
//          else{
//              if(result.get("password") === req.body.password)
//              {
//                  console.log(result.get("_id"));
//                  next();
//              }
//              else{
//                 return res.status(401).send();
//              }
//          }
       
//     });
// }



module.exports.authenticate = authenticate;
module.exports.authenticateUser = authenticateUser;