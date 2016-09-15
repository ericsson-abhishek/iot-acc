var mailjet = require ('node-mailjet').connect('7c6c927b44d43f8d213413548369d4ed', '684a49ef4dbf3c5aaaeb35233d78bcc3')
//7c6c927b44d43f8d213413548369d4ed
//684a49ef4dbf3c5aaaeb35233d78bcc3
//    .connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
var request = mailjet.post("send").request({
        "FromEmail":"mail2abhic@gmail.com",
        "FromName":"IoTApp Support",
        "Subject":"IoTAPP  - Email Confirmation",
        "Text-part":"Dear passenger, welcome to Mailjet! May the delivery force be with you!",
        "Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
        "Recipients":[
            {
                "Email": "abhishek.choudhury@yahoo.com"
            }
        ]
    });
request.then( function (response) {
        console.log (response);
    }).catch(function (err) {

        console.log (err);
    });
