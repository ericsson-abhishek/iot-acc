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

// Bcrypt library is used to hasing the password before storing
var bcrypt = require('bcrypt-nodejs');

// Used for creating HTTP based simulated devices
var clientSim = require("./app/modules/simulator/client_http")

var enterpriseService = require("./app/modules/db/services/enterpriseService");

var deviceService = require("./app/modules/db/services/deviceService");

var tokenService = require("./app/modules/db/services/tokenService");

var authentication = require("./app/modules/middleware/authentication");

var jwt = require("./app/modules/middleware/services/jwt");
// instantiating express
var app = express();
var http = require('http').Server(app);
//var io = require('socket.io')(http);

// process.env.PORT is the port number set by Heroku..for local server the 9000 port would be used
// as process.env.PORT is not supplied in the local env
var PORT = process.env.PORT || 9099;

// //Printing some info about the request by middleware
// function checkEmail(req, res, next) {
//     console.log(req.get("email"));
//     if (req.get("email") === undefined) {
//         res.status(403);
//     }
//     console.log("Before DB Call");
//     enterpriseService.queryEnterpriseByEmail(req.get("email"),function(aaa)
//     {
//         console.log(aaa);
//     }).then(function(result,err)
//     {
//         console.log("00000000000000000000");
//         if(err)
//         {
//             console.log("-------------------------");
//             res.status(500);
//         }
//         else{
//             console.log("+++++++++++++++++++++++++++");
//             console.log(result);
//             next();
//         }

//     });

// }


// app.use(checkEmail);

// using bodyparser as a middleware
app.use(bodyParser.json());

// create application/x-www-form-urlencoded parser 
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    // to be replaced with Mongo DB
var hashMap = require('hashmap');

var deviceDB = new hashMap();



var io = require('socket.io')(http);

io.on('connection', function(socket) {
    console.log("connection initiated from " + (socket.toString()));

    socket.on('message', function(message) {
        console.log("message received " + message.text);
        socket.broadcast.emit('message', message);
    });
})
var devicePrefix = "HTTPSIM000";
var UniqueNumber = 0;

// the following is an example of path specific middleware(pathSpecificLogger), which is used as a second argument of the route difinition
//Enterprise get method
app.get("/enterprise", function(req, resp, next) {
   // authentication.authenticate(req, resp, next);
    console.log('After  enterprise get method');
    resp.send("Getting response from get enterprise method");
});


app.get("/about", function(req, resp) {
    resp.send("About items are listed here");
});


app.post("/device", authentication.authenticateRequired, function(req, resp) {
    //console.log('Enter into device create method' + JSON.stringify(req.body, null, 2));
    //getting enterprise id from jwt service
    //JSON.parse() removes double quotes of json keys
    var deviceData = JSON.parse(JSON.stringify(req.body, null, 2));
    //console.log(req.body.enterpriseId);
    //console.log("Request data after adding enterprise id : "+JSON.stringify(req.body, null, 2));
    //calling create device method with request data
    deviceService.createDevice(deviceData).then(function(result) {
        //Sending response back on successfull device creation
        resp.status(200).send("Device is created successfully with Device Id :" + result.get("_id"));
        //Error handling when some problem occurs for device creation
    }).catch(function(err) {
        console.log(err);
        resp.status(500).send("Sorry !!!! Some error occured while creating device.Please try again.");
    });
});

app.get("/device", authentication.authenticateRequired, function(req, resp) {
    //calling query device method 
    deviceService.queryDeviceByFilter("enterpriseId", req.params.enterpriseId).then(function(result) {
        //Sending response back on successfull device creation
        resp.status(200).send(result);
        //Error handling when some problem occurs for device creation
    }).catch(function(err) {
        console.log(err);
        resp.status(404).send("Sorry !!!! No devices are registered for enterprise : " + req.query.enterpriseEmail);
    });
});

app.post("/enterprise",function(req, resp) {
    //console.log('Enter into device create method' + JSON.stringify(req.body, null, 2));
    //getting enterprise id from jwt service
    //JSON.parse() removes double quotes of json keys
    var deviceData = JSON.parse(JSON.stringify(req.body, null, 2));
    //console.log(req.body.enterpriseId);
    //console.log("Request data after adding enterprise id : "+JSON.stringify(req.body, null, 2));
    //calling create enterprise method with request data
    enterpriseService.createEnterprise(deviceData).then(function(result) {
        //Sending response back on successfull device creation
         resp.status(200).send("Congratulations !!! You have successfully resgistered.Please login to use our services.");
        //Error handling when some problem occurs for device creation
    }).catch(function(err) {
        console.log(err);
        resp.status(500).send("Sorry !!!! Some error occured while registered.Please try again.");
    });
});


app.post("/devices/status/:deviceId",
    function(req, resp) {
        var deviceId = req.params.deviceId;
        console.log("status received from  " + deviceId);
        console.dir(req.body);
        io.emit('message', req.body);
        resp.status(200).send();
    });

app.post("/devices/activate/:deviceId",
    function(req, resp) {
        var deviceId = req.params.deviceId;
        console.log("activate is getting called for " + deviceId)
        var interval = setInterval(() => { clientSim.sendStatus(deviceId) }, 2000);
        deviceDB.set(deviceId, interval);
        resp.status(200).send();

    });

app.post("/devices/deactivate/:deviceId",
    function(req, resp) {
        var deviceId = req.params.deviceId;
        console.log("deactivate device is getting called for " + deviceId)
        var interval = deviceDB.get(deviceId); //setInterval(() => { clientSim.sendStatus(deviceId) }, 2000);
        // deviceDB.put(deviceId, interval);
        console.log(`timer obj retrieved from db for device id ${deviceId} is ${interval}`)
        clearInterval(interval);
        resp.status(200).send();

    });

app.post("/devices/create",
    function(req, resp) {
        UniqueNumber += 1;
        var deviceId = devicePrefix + UniqueNumber;
        console.log("generated device id " + deviceId);
        resp.status(200).json(deviceId);
    });

app.post("/login", authentication.authenticateUser, function(req, resp, next) {
    resp.header("Authorization", req.params.token).status(200).send("Success");
});
var staticMiddlewarePrivate = express['static'](__dirname + '/app/partials');

app.delete("/logout", function(req, resp, next) {
    // console.log("logout");
    var bearerJwt = req.get("Bearer");
    tokenService.deleteToken(bearerJwt).then(function(count) {
        //console.log("count : "+count.result.n);
        if (count.result.n === 1) {
            resp.status(200).send("Logged out successfully.");
        }
        //console.log(result);
        resp.status(401).send("Unauthorized user, please login again.");
    }).catch(function(err) {
        resp.status(500).send("Sorry !!!! Some error occured while creating device.Please try again.");
    });
});

app.get('/private/*', authentication.authenticateRequired, function(req, res, next) {
    console.log('**** Private ****' + req.url);
    req.url = req.url.replace(/^\/private/, '');
    // if (req.get("AUTH")) {
    //     console.log("Auth received");
    staticMiddlewarePrivate(req, res, next);
    // } else {
    //     console.log("Auth not received")
    //     console.log("put custom logic here");
    //     res.status(401).send();
    // }

});

app.use(express.static(__dirname + "/app/public"));


var drop;
var connect = mongoose.connect('mongodb://localhost:27017/iotaccdb',function(){
    drop = mongoose.connection.db.dropDatabase()
    console.log("Database is dropped succesfully");
});

connect.then(function(res){drop.then(function(msg){
    http.listen(PORT, function(error, success) {
    if (error) {
        console.log("server startup failed");
    } else {
        console.log("server is started at port " + PORT + " press [ctrl+c] to exit!!");
    }
});

}).catch(function(err){
    console.log(err);
});
});



// //GET an individual todo with ID=:id
// app.get("/todos/:id", requireauthMW.requires,
//     function(req, resp) {
//         var todoId = parseInt(req.params.id, 10);
//         db.todo.findById(todoId).then(function(todo) {
//             if (todo) {
//                 resp.status(200).json(todo.toJSON());
//             } else {
//                 console.log("Error");
//                 resp.status(404).send();
//             }

//         }).catch(function(error) {
//             console.log("Error");
//             resp.status(404).send();


//         });

//     }
// );


// // create new todo item
// app.post("/todos", requireauthMW.requires,
//     function(req, resp) {
//         // using body-parser provides the feature of req.body to be used
//         var body = req.body;
//         db.todo.create({
//             description: body.description,
//             completed: body.completed
//         }).then(function(todo) {
//             resp.status(200).json(todo.toJSON());
//         }).
//         catch(function(error) {
//             resp.status(400).json(error);
//         })
//     }
// );


// // create new todo item
// app.post("/users",
//     function(req, resp) {
//         // using body-parser provides the feature of req.body to be used
//         var body = _.pick(req.body, 'email', 'password');
//         db.user.create(body).then(function(user) {
//             resp.status(200).json(user.toBareUser());
//         }).
//         catch(function(error) {
//             resp.status(400).json(error);
//         })
//     }
// );

// app.post("/users/login",
//     function(req, resp) {
//         // using body-parser provides the feature of req.body to be used
//         var body = _.pick(req.body, 'email', 'password');
//         var generatedToken;
//         // authenticate the user
//         db.user.authenticate(body).then(
//             // for successfull authentication wiil have the user instance populated
//             function(user) {
//                 // generate the token
//                 generatedToken = user.generateJwtToken('Authentication');
//                 // create the token by hashing it in DB
//                 db.token.create({
//                         token: generatedToken
//                     }).
//                     // setting the auth header
//                 then(function() {
//                     resp.header('AUTH', generatedToken).status(200).json(user.toBareUser())
//                 })
//             },
//             function() {
//                 resp.status(401).send();
//             }).
//         catch(function(err) {
//             console.log(err);
//             resp.status(500).send();
//         })
//     }
// );

// app.post("/users/logout", requireauthMW.requires,
//     function(req, resp) {
//         req.token.destroy().then(resp.status(204).send());
//     }
// )


//if you dont provide any route for the "/" , this would get autometically invoked
// __dirname  => is an predefined variable within node which gives the path of current working directory