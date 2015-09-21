var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/User.js');
var jwt = require('jwt-simple');
var passport = require('passport');
var facebookAuth = require('./services/facebookAuth.js');
var createSendToken = require('./services/jwt.js');
var config = require('./services/config.js');
var qs = require('querystring');
var LocalStrategy = require('./services/localStrategy.js');
var googleAuth = require('./services/googleAuth.js');
var kupi = require('./services/kupi.js');
var emailVerification = require('./services/emailVerification.js');



var app = express();

app.use(bodyParser.json());
app.use(passport.initialize());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    //.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'http://localhost:9000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    next();

});

passport.use('local-register', LocalStrategy.register);
passport.use('local-login', LocalStrategy.login);


app.post('/register', passport.authenticate('local-register'), function(req, res) {
    emailVerification.send(req.user.email); 
    createSendToken(req.user, res);
})

app.get('/auth/verifyEmail', emailVerification.handler);

app.post('/login', passport.authenticate('local-login'), function(req, res, next) {
    createSendToken(req.user, res);
})

app.post('/auth/facebook', facebookAuth);

app.get('/kupi', kupi);

app.post('/auth/google', googleAuth);


mongoose.connect('mongodb://localhost/bazaKorisnika');


var server = app.listen(3000, function() {
    console.log('api listening on', server.address().port);
});