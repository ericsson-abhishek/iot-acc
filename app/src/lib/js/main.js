
var util = require ('./myAlert')

window.onload=function()
{
    util.myAlert("Welcome to the starter page");
    util.appendBody(["Started using Jquery","with browserify","The automation is done with Gulp","Checking the last few steps"])

}
