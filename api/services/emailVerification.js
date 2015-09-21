var _ = require('underscore');
var fs = require('fs');
var jwt = require('jwt-simple');
var config = require('./config.js');
var nodemailer = require('nodemailer');
var User = require('../models/User.js');



var model = {
    verifyUrl: 'http://localhost:3000/auth/verifyEmail?token=',
    title: 'Diplomski rad online nadoplata bona za mobitel',
    subTitle: 'Hvala što ste se registrirali',
    body: 'Molimo Vas da verificirate svoju mail adresu. Molimo pritisnite na gumb Verify'

}


exports.send = function(email) {

    var payload = {
        sub: email

    }

    var token = jwt.encode(payload, config.EMAIL_SECRET);

    var transporter = nodemailer.createTransport({
        service: 'yahoo',
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'isimic@ymail.com',
            pass: 'Nen0&1234'
        }
    });

    var mailOptions = {
        from: 'Neno ✔ <isimic@ymail.com>', // sender address
        to: email, // list of receivers
        subject: 'Ajde kralju ovo verificiraj da nisi možda hacker ✔', // Subject line
        html: getHtml(token)
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });

}
exports.handler = function(req, res) {
    var token = req.query.token;

    var payload = jwt.decode(token, config.EMAIL_SECRET);

    var email = payload.sub;

    if (!email) return handleError(res);

    User.findOne({
        email: email
    }, function(err, user) {
        if (err) return res.status(500);

        //if (!foundUser) return handleError(res);

        if (!user.active)
            user.active = true;
        
        user.save(function(err){
            if (err) return res.status(500);
            
            return res.redirect(config.APP_URL);
            
        })

    })


}

function getHtml(token) {
    var path = './views/emailVerification.html';
    var html = fs.readFileSync(path, encoding = 'utf8');

    var template = _.template(html);

    model.verifyUrl += token;

    return template(model);

}

function handleError(res) {
    return res.status(401).send({
        message: 'Authentication failed, unable to verfy email'
    });
}


_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};