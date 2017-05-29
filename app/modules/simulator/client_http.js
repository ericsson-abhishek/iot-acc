var rp = require('request-promise');

var urlPref = '';
var env = process.env.NODE_ENV || 'development';
if (env === 'production') {
    urlPref = 'https://iot-one.herokuapp.com';

} else {
    urlPref = 'http://localhost:9099'
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function sendStatus(deviceId) {

    console.log("sendStatus is called");
    var options = {
        method: 'POST',
        uri: urlPref + '/devices/status/' + deviceId,
        body: {
            data: getRandomInt(10, 20),
            deviceId: deviceId,
            time: new Date()
        },
        json: true // Automatically stringifies the body to JSON 
    };

    rp(options)
        .then(function(parsedBody) {
            console.log(parsedBody)
        })
        .catch(function(err) {
            console.log(err);
            throw err;
        });

}

module.exports.sendStatus = sendStatus;