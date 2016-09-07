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
   //Validating the user when logged in
   enterpriseService.validateEnterprise(req.body.username,req.body.password).then(function(result){
   //Generating jwt token once user is validated    
   jwt.generateJWTtoken(result,"OAUTH").then(function(jwtToken){
   //Generating actual token by passing jwt token
   tokenService.createToken(jwtToken).then( function(token) {
   //console.log("Success");
   //Adding the token in response header
   res.header({"Authorization" : "Bearer "+token._id}).status(200).send("Successfully Logged In.");
            });
        });
           //next();
    //Error handling logic when promise is rejected.       
    }).catch(function(err){
            //console.log(err);
            res.status(401).send(err);
    });
}
    
    
module.exports.authenticate = authenticate;
module.exports.authenticateUser = authenticateUser;