const express = require('express');
const router = express.Router();
const path = require('path');
const sendmail = require('sendmail')();


router.get('/', (req, res) => {
    res.status(202).sendFile(path.resolve("index.html"));
})

router.get('/resume', (req, res) => {
    res.send('/public/DanielDeLaRosaResume2018.pdf');
})

router.post('/email', (req, res) => {
    sendmail({
        from: 'hello@dela1000.com',
        to: 'dela1000@gmail.com',
        subject: 'dela1000 website inquiry',
        html: 'Name: ' + req.body.name + ', ' + 'Email: ' + req.body.email + ', ' + 'Message: ' + req.body.message,
    }, function(err, reply) {
        if (err) {
            console.log(err && err.stack);
            res.status(401).json({
                message: 'email not sent'
            })
        }
        if (reply) {
            res.status(200).json({
                message: 'Email sent'
            })
        }
    });
});


module.exports = router;