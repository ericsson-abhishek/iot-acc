var _ = require('underscore')

function myAlert(message) {
    alert("⛄⛄⛄⛄ " + message + " ⛄⛄⛄⛄");
}

function appendBody(lines) {
    _.each(lines, function(line) {
        $("#messageHere").append(line + '<BR>');
    })
}



module.exports.myAlert = myAlert;

module.exports.appendBody = appendBody;