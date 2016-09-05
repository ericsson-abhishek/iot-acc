//Used enterprise module
var enterpriseService = require("../db/services/enterpriseService");

//Printing some info about the request by middleware
var authenticate = function authenticate(req, res, next) {
    console.log(req.get("email"));
    if (req.get("email") === undefined) {
        res.status(403);
    }
    console.log("Before DB Call");
    enterpriseService.queryEnterpriseByEmail(req.get("email")).then(function (result, err) {
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
            }
            else {
                console.log("Failure");
                res.status(403);
            }
        }
    });
}

var validateUser = function validateUser(req, res, next) {
  var isAuthenticated = false;  
  var body = [];
  req.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    console.log(body[0]);
     enterpriseService.queryEnterprise("username",body[0]).then(function (result, err) {
        console.log("In callback method");
        if (err) {
            console.log("Internal error occured");
            res.status(500);
        }
        else {
            console.log("Queried sucessfully" + result);
            if (typeof result !== 'undefined' && result) {
                isAuthenticated=true;
                console.log("Success");
                res.status(200);
            }
            else {
                console.log("Failure");
                res.status(401);
            }
        }
    });
  });
}



module.exports.authenticate = authenticate;
module.exports.validateUser = validateUser;