var _ = require('underscore')
var $ = require('jquery')

function myAlert(message) {
    alert("⛄⛄⛄⛄ " + message + " ⛄⛄⛄⛄");
}

function appendBody(lines) {
    _.each(lines, function(line) {
        $("#messageHere").append(line + '<BR>');
    })
}

function toggleChevron(e) {
    $(e.target)
        .prev('.panel-heading')
        .find("i.indicator")
        .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}

function addToggleChevron() {
    $('#accordion').on('hidden.bs.collapse', toggleChevron);
}

module.exports.myAlert = myAlert;
module.exports.addToggleChevron = addToggleChevron;
module.exports.appendBody = appendBody;