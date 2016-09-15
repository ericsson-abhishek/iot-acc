var mailjet = require('node-mailjet').connect('7c6c927b44d43f8d213413548369d4ed', '684a49ef4dbf3c5aaaeb35233d78bcc3')
    //7c6c927b44d43f8d213413548369d4ed
    //684a49ef4dbf3c5aaaeb35233d78bcc3
    //    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)

var send = function(mailObj) {
    var request = mailjet.post("send").request({
        "FromEmail": "mail2abhic@gmail.com",
        "FromName": "IoTApp Support",
        "Subject": "IoTAPP  - Email Confirmation",
        "Text-part": "Dear " + mailObj.name + ", welcome to IOTAPP! Please click the following link to activate your account!",
        "Html-part": "<h3>Dear " + mailObj.name + " , welcome to IOTAPP!</h3><br/>" +
            "<h2>Your account has been successfully created</h2>" +
            "<p>Please click the following link to activate your account!</p>" +
            "<a href='http://100.96.115.100:9099/enterprise/activate?activateId="+ mailObj.activateId +"'>click here</a>",
        "Recipients": [{
            "Email": mailObj.email
        }]
    });
    return request;

}

module.exports.send = send;





