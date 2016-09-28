var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// import express module
var express = require("express");

// body-parser is required for parsing the json data from POST request's body.
var bodyParser = require("body-parser");

// The convension for declaring variable for underscore is to use '_'.
// It is required for a set of utilities and validation purposes.
// It is used as a middleware with Express using app.use()
var _ = require("underscore");

//// Bcrypt library is used to hasing the password before storing
//var bcrypt = require('bcrypt-nodejs');

// Used for creating HTTP based simulated devices
var clientSim = require("./app/modules/simulator/client_http")

//var enterpriseService = require("./app/modules/appdb/services/enterpriseService");
//
//var deviceService = require("./app/modules/appdb/services/deviceService");
//
//var tokenService = require("./app/modules/appdb/services/tokenService");
//

var appdb = require("./app/modules/db");
var authentication = require("./app/modules/middleware/authentication");

var mailSender = require("./app/modules/mail/sendmail.js");

//console.log(process.env.NODE_ENV)
//var jwt = require("./app/modules/middleware/services/jwt");
// instantiating express
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

// process.env.PORT is the port number set by Heroku..for local server the 9000 port would be used
// as process.env.PORT is not supplied in the local env
var PORT = process.env.PORT || 9099;

// using body-parser as a middleware
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
// to be replaced with Mongo DB
var hashMap = require('hashmap');

var deviceDB = new hashMap();


var io = require('socket.io')(http);

io.on('connection', function (socket) {
    console.log("connection initiated from " + (socket.toString()));

    socket.on('message', function (message) {
        console.log("message received " + message.text);
        socket.broadcast.emit('message', message);
    });
});
var devicePrefix = "HTTPSIM000";
var UniqueNumber = 0;

// the following is an example of path specific middleware(pathSpecificLogger), which is used as a second argument of the route difinition
//Enterprise get method
//console.log(process.env.NODE_ENV);

app.get("/about", function (req, resp) {
    resp.send("About items are listed here");
});


app.post("/device", authentication.authenticateRequired, function (req, resp) {
    //console.log('Enter into device create method' + JSON.stringify(req.body, null, 2));
    //getting enterprise id from jwt service
    //JSON.parse() removes double quotes of json keys
    //req.body.enterpriseId = req.params.enterpriseId;
    // var deviceData = JSON.parse(JSON.stringify(req.body));

    var deviceData = _.omit(req.body, '');
    deviceData.enterpriseId = req.params.enterpriseId;
    console.log(deviceData);
    // var deviceData = {};
    // deviceData.name = req.body.name;
    // , manufacturer : req.body.manufacturer,serialNo : req.body.serialNo,protocol : req.body.protocol,enterpriseId : req.params.enterpriseId,status : req.body.status
    //console.log(req.body.enterpriseId);
    //console.log("Request data after adding enterprise id : "+JSON.stringify(req.body, null, 2));
    //calling create device method with request data
    appdb.deviceService.createDevice(deviceData).then(function (result) {
        //Sending response back on successfull device creation
        resp.status(200).send("Device is created successfully with Device Id :" + result.get("_id"));
        //Error handling when some problem occurs for device creation
    }).catch(function (err) {
        console.log(err);
        resp.status(500).send("Sorry !!!! Some error occured while creating device.Please try again.");
    });
});

app.get("/device", authentication.authenticateRequired, function (req, resp) {
    //calling query device method 
    appdb.deviceService.queryDeviceByFilter("enterpriseId", req.params.enterpriseId).then(function (result) {
        //Sending response back on successfull device creation
        resp.status(200).send(result);
        //Error handling when some problem occurs for device creation
    }).catch(function (err) {
        console.log(err);
        resp.status(404).send("Sorry !!!! No devices are registered for enterprise : " + req.query.enterpriseEmail);
    });
});

app.post("/enterprise", function (req, resp) {

    var enterpriseData = _.omit(req.body, '');
    console.dir(enterpriseData);

    //calling create enterprise method with request data
    appdb.enterpriseService.createEnterprise(enterpriseData).then(function (result) {
        console.log(result);
        // creating object for sending the activation mail notification
        var mailObj = {
            name: result.firstname,
            email: result.email,
            activateId: result.activation_hash
        };

        // send the mail notification
        mailSender.send(mailObj).then(function (response) {
            console.log(typeof response.response != 'undefined');
            if (typeof response.response != 'undefined') {
                console.log("if");
                resp.status(200).send(_.omit(result, '_id'));
            } else {
                console.log("else");
                retrySendMail(mailObj);
                resp.status(200).send("Sorry there is some issue while sending activation email.We will be sending it shortly.");
            }
        });
    }).catch(function (err) {
        console.log(err);
        resp.status(500).send("Sorry !!!! Some error occured while registered.Please try again.");
    });
});

var retrySendMail = function (mailObj) {
    var sendCount = 0;
    if (sendCount < 1) {
        mailSender.send(mailObj).then(function (response) {
            console.log(typeof response.response != 'undefined');
            if (typeof response.response != 'undefined') {
                sendCount = 1;
                console.log("Retry successful");

                return;
            } else {
                process.nextTick(function () {
                    console.log("Retrying");
                    retrySendMail(mailObj);
                });
            }
        });
    }
};

app.get("/enterprise/activate", function (req, resp) {
    var activateId = req.query.activateId;
    console.log("activate is getting called for " + activateId);
    appdb.enterpriseService.activateEnterprise(activateId).then(function (result) {
        resp.status(200).send(result);
    }).catch(function (err) {
        console.log("Some error occurred while enterprise activation" + err);
        resp.status(500).send(err);
    });
});

app.post("/enterprise/activate/resend", function (req, resp) {
    var email = req.body.email;
    console.log("resend activate is getting called for " + email);
    appdb.enterpriseService.resendActivationEmail(email).then(function (result) {
        console.log("result is " + result);
        var mailObj = {
            name: result.firstname,
            email: result.email,
            activateId: result.activation_hash
        };
        // send the mail notification
        mailSender.send(mailObj).then(function (response) {
            console.log(response);
            resp.status(200).send(_.omit(result, '_id'));
        });
    }).catch(function (err) {
        console.log(err);
        resp.status(500).send(err);
    });
});

app.post("/devices/status/:deviceId",
    function (req, resp) {
        var deviceId = req.params.deviceId;
        console.log("status received from  " + deviceId);
        console.dir(req.body);
        io.emit('message', req.body);
        resp.status(200).send();
    });

app.post("/devices/activate/:deviceId",
    function (req, resp) {
        var deviceId = req.params.deviceId;
        console.log("activate is getting called for " + deviceId)
        var interval = setInterval(function () {
            clientSim.sendStatus(deviceId)
        }, 2000);
        deviceDB.set(deviceId, interval);
        resp.status(200).send();

    });

app.post("/devices/deactivate/:deviceId",
    function (req, resp) {
        var deviceId = req.params.deviceId;
        console.log("deactivate device is getting called for " + deviceId)
        var interval = deviceDB.get(deviceId); //setInterval(() => { clientSim.sendStatus(deviceId) }, 2000);
        // deviceDB.put(deviceId, interval);
        console.log("timer obj retrieved from deviceDB for device id " + deviceId + " is " + interval)
        clearInterval(interval);
        resp.status(200).send();

    });

app.post("/devices/create",
    function (req, resp) {
        UniqueNumber += 1;
        var deviceId = devicePrefix + UniqueNumber;
        console.log("generated device id " + deviceId);
        resp.status(200).json(deviceId);
    });


app.get("/enterprise", authentication.authenticateRequired, function (req, resp) {
    appdb.enterpriseService.queryEnterpriseByFilter("_id", req.params.enterpriseId).then(function (result) {
        console.log("get enterprise");
        console.dir(result)
        console.log("get enterprise result");
        appdb.deviceService.queryDeviceByFilter("enterpriseId", result._id).then(function (devices) {
            var responseData = _.pick(result, 'firstname', 'lastname');
            responseData.totalDevices = devices.length;
            var activatedDevices = 0;
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].status === true) {
                    activatedDevices += 1;
                }
            }
            responseData.activatedDevices = activatedDevices;
            console.log("Activated devices  " + activatedDevices);
            resp.header("Authorization", req.params.token).status(200).send(responseData);
        })
    })
        .catch(function (error) {
            console.log("Error occured while querying devices " + err);
        })


})

app.post("/login", authentication.authenticateUser, function (req, resp, next) {
    console.log("Enter into login method for : " + req.body.email);
    appdb.enterpriseService.queryEnterpriseByFilter("email", req.body.email).then(function (enterpriseDetails) {
        console.log("Enterprise queried successfully." + enterpriseDetails);
        appdb.deviceService.queryDeviceByFilter("enterpriseId", enterpriseDetails._id).then(function (devices) {
            console.log("Total  devices : " + devices);
            var responseData = _.pick(enterpriseDetails, 'firstname', 'lastname');
            responseData.totalDevices = devices.length;
            var activatedDevices = 0;
            for (var i = 0; i < devices.length; i++) {
                if (devices[i].status === true) {
                    activatedDevices += 1;
                }
            }
            responseData.activatedDevices = activatedDevices;
            console.log("Activated devices  " + activatedDevices);
            resp.header("Authorization", req.params.token).status(200).send(responseData);
        }).catch(function (err) {
            console.log("Error occured while querying devices " + err);
        });
    });
});


app.delete("/logout", authentication.authenticateRequired, function (req, resp, next) {
    console.log("logout method called");
    var bearerJwt = req.get("Bearer");
    appdb.tokenService.deleteToken(bearerJwt).then(function (count) {
        console.log("count : " + count.result.n);
        if (count.result.n === 1) {
            resp.status(200).send("Logged out successfully.");
        }
        //console.log(result);
        resp.status(401).send("Unauthorized user, please login again.");
    }).catch(function (err) {
        resp.status(500).send("Sorry !!!! Some error occured while creating device.Please try again.");
    });
});

var staticMiddlewarePrivate = express['static'](__dirname + '/app/partials');
app.get('/private/*', authentication.authenticateRequired, function (req, res, next) {
    console.log('**** Private ****' + req.url);
    req.url = req.url.replace(/^\/private/, '');
    staticMiddlewarePrivate(req, res, next);
});

var connectNodeServer = function () {
        http.listen(PORT, function (error, success) {
            if (error) {
                console.log("server startup failed");
            } else {
                console.log("server is started at port " + PORT + " press [ctrl+c] to exit!!");
            }
        });
};

// __dirname  => is an predefined variable within node which gives the path of current working directory
app.use(express.static(__dirname + "/app/public"));


console.log("Ennnnnnnnnnnnnnnnnnn" + process.env.NODE_ENV)
var mongo_uri = process.env.MONGODB_URI || "mongodb://localhost:27017"

if (process.env.NODE_ENV === "Test") {
        connectNodeServer();
} else {
    var connect = mongoose.connect(mongo_uri + '/iotaccdb', function () {
        // mongoose.connection.db.dropDatabase()
        // console.log("Database is dropped succesfully");
    });

    connect.then(function (res) {
        connectNodeServer();
    }).catch(function (err) {
        console.log("FATAL error while connecting DB!! Server start failure" + err);
    });
}

module.exports = app;