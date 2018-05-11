const express = require('express');
const router = express.Router();
const path = require('path');
var nodemailer = require('nodemailer');
var secrets = require('../secrets/secrets.js');

var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: secrets.gmailAddress,
        pass: secrets.gmailPass
    }
});

router.get('/', (req, res) => {
    res.status(202).sendFile(path.resolve("index.html"));
})

router.post('/email', (req, res) => {
    var mailOptions = {
        from: req.body.email,
        to: secrets.gmailAddress,
        subject: 'Nessage from ' + req.body.name + ' at ' + req.body.email,
        text: 'Name: ' + req.body.name + ', ' + 'Email: ' + req.body.email + ', ' + 'Message: ' + req.body.message
    }

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
                message: 'Email sent',
                response: response
            })
        }
    });
});


module.exports = router;