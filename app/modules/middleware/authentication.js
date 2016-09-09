//Used enterprise module
var enterpriseService = require("../db/services/enterpriseService");

var jwt = require("./services/jwt");
var tokenService = require("../../modules/db/services/tokenService");

//Checking for user authentocation
var authenticateRequired = function authenticateRequired(req, res, next) {
    console.log(req.get("Bearer"));
    if (req.get("Bearer") === undefined) {
        res.status(403);
    }
    //console.log("Before DB Call");
    var bearerJwt = req.get("Bearer");
    tokenService.findToken(bearerJwt).then(function(token){
        if(token === null){
             console.log("Token not found.");
             res.status(401).send("Unauthorized user, please login again.");
        } else {
        console.log("Token Authenticated User");
        jwt.getUserInfoFromJWT(bearerJwt).then(function (enterpriseId) {
            console.log("enterprise id : "+enterpriseId+" is successfully added to request object.");
            req.params.enterpriseId = enterpriseId;
            next();
        }).catch(function (err) {
            console.log(err);
            res.status(401).send("Unauthorized User,Please Login Again!");
        });
      }
    }).catch(function(err){
                console.log("Error occured in find method ");
                res.status(401).send("Unauthorized user, please login again.");
    });
}


var authenticateUser = function authenticateUser(req, res, next) {
   //Validating the user when logged in
   enterpriseService.validateEnterprise(req.body.email,req.body.password).then(function(result){
   //Generating jwt token once user is validated    
   jwt.generateJWTtoken(result,"OAUTH").then(function(jwtToken){
   //Generating actual token by passing jwt token
   tokenService.createToken(jwtToken).then( function(token) {
   //console.log("Success");
        req.params.token = jwtToken;
        //console.log("Success" +req.params.token);
        next();
         });
       });
    //Error handling logic when promise is rejected.       
    }).catch(function(err){
            console.log(err);
            res.status(401).send(err);
    });
}
    

module.exports.authenticateRequired = authenticateRequired;
module.exports.authenticateUser = authenticateUser;