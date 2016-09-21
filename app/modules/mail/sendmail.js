var mailjet = require('node-mailjet').connect('7c6c927b44d43f8d213413548369d4ed', '684a49ef4dbf3c5aaaeb35233d78bcc3')
    //7c6c927b44d43f8d213413548369d4ed
    //684a49ef4dbf3c5aaaeb35233d78bcc3
    //    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

var send = function(mailObj) {
    var env = process.env.NODE_ENV || 'development';
    if (env === 'production') {
        urlPref = 'https://iot-one.herokuapp.com';

    } else {
        urlPref = 'http://localhost:9099'
    }
    var request = mailjet.post("send").request({
        "FromEmail": "mail2abhic@gmail.com",
        "FromName": "IOTAPP Support Team",
        "Subject": "Confirm email",
        "MJ-TemplateID": "50577",
        "MJ-TemplateLanguage": true,
        "Recipients": [{
            "Email": mailObj.email
        }],
        "Vars": {
            "firstname": mailObj.name,
            "link": urlPref + "/enterprise/activate?activateId=" + mailObj.activateId
        }
    });
    return request;

}

module.exports.send = send;