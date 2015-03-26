var fs = require('fs'),
    path = require("path");

var express = require('express'),
    app = express(),
    passport = require('passport'),
    SamlStrategy = require('passport-saml').Strategy;

var moodle = require('./moodle/');

var port = process.env.PORT || 3000,
    ip = process.env.IP || '127.0.0.1';


//Configurer passport
passport.use(new SamlStrategy({
        path: '/authentification',
        entryPoint: 'https://code.uqam.ca/simplesaml/saml2/idp/SSOService.php',
        issuer: 'http://neo.dahriel.io',
        cert: fs.readFileSync(path.resolve(__dirname, 'configuration/securite/certificat.crt'), 'utf-8'),
        identifierFormat: null
    }, function (profile, done) {
        console.log(profile, done);
        done(null, {});
    })
);

app.use(express.static(process.env.REPERTOIRE_PUBLIC));
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
{
    extended: true
}
app.use(bodyParser.json());

var session = require('express-session');
app.use(session({
    secret: 'On est open source.',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

//Configurer les intergiciels
//Moodle
app.get('/api/moodle', passport.authenticate('saml', { failureRedirect: '/#401', failureFlash: true }), function(req, res){
    res.send('SECRET!');
});
app.use('/api/moodle/cotes', passport.authenticate('saml', { failureRedirect: '/#401', failureFlash: true }), moodle.passerelle.coteFinals);

var server = app.listen(port, ip, function () {
    console.log('YOUPPY!');
});

module.exports = app;