var rp = require('request-promise');

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function sendStatus(deviceId)
{

    console.log("sendStatus is called");
    var options = {
        method: 'POST',
        uri: 'http://localhost:9000/devices/status/'+deviceId,
        body: {
            data:getRandomInt(10,20),
            deviceId:deviceId,
            time: new Date()
        },
        json: true // Automatically stringifies the body to JSON 
    };

    rp(options)
        .then(function (parsedBody) {
            console.log(parsedBody)
        })
        .catch(function (err) {
            console.log(err);
            throw err;
        });

}

module.exports.sendStatus = sendStatus;