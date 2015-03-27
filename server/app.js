var fs = require('fs'),
    path = require("path");

/**
 * Fast, unopinionated, minimalist web framework. [express]{@link https://www.npmjs.com/package/express}
 * @type {exports}
 */
var express = require('express'),
    app = express(),
    /**
     * Simple, unobtrusive authentication for Node.js. [passport]{@link https://www.npmjs.com/package/passport}
     * @module server
     */
    passport = require('passport'),
    /**
     * SAML 2.0 authentication strategy for Passport. [passport]{@link https://www.npmjs.com/package/passport-saml}
     * @module server
     */
    SamlStrategy = require('passport-saml').Strategy,
    /**
     * Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware. Voir [cookie-parser]{@link https://www.npmjs.com/package/cookie-parser}
     * @module server
     */
    cookieParser = require('cookie-parser'),
    /**
     * Simple session middleware for Express. [express-session]{@link https://www.npmjs.com/package/express-session}
     * @type {exports}
     */
    session = require('express-session'),
    /**
     * Node.js body parsing middleware. [body-parser]{@link https://www.npmjs.com/package/body-parser}
     * @module server
     */
    bodyParser = require('body-parser');


var moodle = require('./moodle/');

//Initialiser les variables de processus.
var port = process.env.PORT || 3000,
    ip = process.env.IP || '127.0.0.1',
    emetteur = process.env.EMETTEUR || 'http://www.uqam.ca',
    repertoirePublic = process.env.REPERTOIRE_PUBLIC || './dist/app.js';


//Configurer passport
passport.use(new SamlStrategy({
        path: '/authentification',
        entryPoint: 'https://code.uqam.ca/simplesaml/saml2/idp/SSOService.php',
        issuer: emetteur,
        cert: fs.readFileSync(path.resolve(__dirname, 'configuration/securite/certificat.crt'), 'utf-8'),
        identifierFormat: null
    }, function (profile, done) {
        console.log(profile, done);
        done(null, {});
    })
);
//Configurer express

//Configurer le chemins des fichiers statiques html, css, js, images et autres.
app.use(express.static(repertoirePublic));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'On est open source.',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Configurer les intergiciels

//Moodle
app.get('/api/moodle', passport.authenticate('saml', {
    failureRedirect: '/#401',
    failureFlash: true
}), function (req, res) {
    res.send('SECRET!');
});

app.use('/api/moodle/cotes', passport.authenticate('saml', {
    failureRedirect: '/#401',
    failureFlash: true
}), moodle.passerelle.coteFinals);


//Démarrer le serveur
var server = app.listen(port, ip, function () {
    console.log('YOUPPY!');
});

module.exports = app;