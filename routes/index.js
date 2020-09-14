const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const secrets = require('../secrets/secrets.js');
const http = require('http');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,
    auth: {
        user: secrets.gmailAddress,
        pass: secrets.gmailPass
    }
});

router.get('/', (req, res) => {
    res.status(202).sendFile(path.resolve("index.html"));
})

router.post('/email', (req, res) => {
    let clientIp = req.clientIp;
    console.log("+++ 24 index.js clientIp: ", clientIp);

    if (clientIp.substr(0, 7) == "::ffff:") {
      clientIp = clientIp.substr(7)
    }

    var ipstackLink = 'http://api.ipstack.com/' + clientIp + '?access_key=' + secrets.ipstack;
    console.log("+++ 30 index.js ipstackLink: ", ipstackLink)

    http.get(ipstackLink, (resp) => {
      let data = '';

      // A chunk of data has been recieved.
      resp.on('data', (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
        console.log("+++ 42 index.js data: ", data)
        var ipLocationData = data;
        

        var textData = ' Name: ' + req.body.name + '\n Email: ' + req.body.email  + '\n IP Address: ' + clientIp + '\n\n Message: ' + req.body.message;

        if(ipLocationData){
            textData = text + '\n\n' + ipLocationData;
        }

        const mailOptions = {
            from: req.body.email,
            to: secrets.gmailAddress,
            subject: 'Message from ' + req.body.name + ' at ' + req.body.email  + ' from ' + req.body.source,
            text: textData
        }
        console.log("+++ 30 index.js mailOptions: ", mailOptions)
        transporter.sendMail(mailOptions, function(err, response) {
            if (err) {
                console.log("err");
                console.log(err);
                console.log(err && err.stack);
                res.status(401).json({
                    message: 'email not sent',
                    err: err
                })
            } else {
                console.log("Message sent");
                res.status(200).json({
                    message: 'Thank you for the message. I will get back to you very soon.',
                    response: response
                })
            }
        });
      });

    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
});


module.exports = router;
