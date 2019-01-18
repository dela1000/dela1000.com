const express = require('express');
const router = express.Router();
const path = require('path');
const nodemailer = require('nodemailer');
const secrets = require('../secrets/secrets.js');

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
    const mailOptions = {
        from: req.body.email,
        to: secrets.gmailAddress,
        subject: 'Nessage from ' + req.body.name + ' at ' + req.body.email,
        text: 'Name: ' + req.body.name + ', ' + 'Email: ' + req.body.email + ', ' + 'Message: ' + req.body.message
    }

    transporter.sendMail(mailOptions, function(err, response) {
        console.log("+++ 28 index.js response: ", response)
        console.log("+++ 29 index.js err: ", err)
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


module.exports = router;