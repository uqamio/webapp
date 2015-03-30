var fs = require('fs'),
    path = require("path"),
    util = require('util');

/**
 * Fast, unopinionated, minimalist web framework.
 * [express]{@link https://www.npmjs.com/package/express}
 * @type {exports}
 */
var express = require('express'),
    app = express(),
    /**
     * Simple, unobtrusive authentication for Node.js.
     * [passport]{@link https://www.npmjs.com/package/passport}
     * @module server
     */
    passport = require('passport'),
    /**
     * SAML 2.0 authentication strategy for Passport.
     * [passport-saml]{@link https://www.npmjs.com/package/passport-saml}
     * @module server
     */
    SamlStrategy = require('passport-saml').Strategy,
    /**
     * Local username and password authentication strategy for Passport.
     * [passport-local]{@link https://www.npmjs.com/package/passport-local}
     * @module server
     */
    LocalStrategy = require('passport-local').Strategy,
    /**
     * Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
     * Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret so it may be used by other middleware.
     * [cookie-parser]{@link https://www.npmjs.com/package/cookie-parser}
     * @module server
     */
    cookieParser = require('cookie-parser'),
    /**
     * Simple session middleware for Express.
     * [express-session]{@link https://www.npmjs.com/package/express-session}
     * @type {exports}
     */
    session = require('express-session'),
    /**
     * Node.js body parsing middleware.
     * [body-parser]{@link https://www.npmjs.com/package/body-parser}
     * @module server
     */
    bodyParser = require('body-parser'),
    expressJwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    secretClient = fs.readFileSync(path.resolve(__dirname, 'configuration/securite/secretClient.crt'));


var moodle = require('./moodle/');

//Initialiser les variables de processus.
var port = process.env.PORT || 3000,
    emetteur = process.env.EMETTEUR || 'http://www.uqam.ca',
    repertoirePublic = process.env.REPERTOIRE_PUBLIC || './dist/app.js';

//Configurer express
app.set('views', path.resolve(__dirname, './vues'));
app.set('view engine', 'jade');

//Configurer passport
passport.use(new SamlStrategy({
        path: '/authentification',
        entryPoint: 'https://code.uqam.ca/simplesaml/saml2/idp/SSOService.php',
        issuer: emetteur,
        cert: fs.readFileSync(path.resolve(__dirname, 'configuration/securite/certificat.crt'), 'utf-8'),
        identifierFormat: null
    }, function (profile, done) {
        console.log('dans SamlStrategy', profile, done);
        done(null, {});
    })
);
passport.use(new LocalStrategy(
    function (username, password, done) {
        if (username === password)
            done(null, 'localUser');
    }
));

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
app.get('/gestion',
    passport.authenticate(['saml'], {
        failureRedirect: '/#401',
        failureFlash: false
    }), function (req, res) {
        console.log(req);
        console.log(res);
        res.send('Dans /gestion');
    });

app.post('/authentification', function (req, res) {
    var profile = {
            first_name: 'Étudian',
            last_name: 'Libre',
            email: 'libre.etudiant@uqam.ca',
            id: 123456
        },
        token = jwt.sign(profile, secretClient, {expiresInMinutes: 60 * 5});

    res.render('tokenClient', { token: token });
   // res.send(util.format(script, token));
});

//On bloque tous les calls vers /api
app.use('/api', expressJwt({secret: secretClient}));
app.use('/api/moodle/cotes', moodle.passerelle.coteFinals);

//Démarrer le serveur
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('On part! http://%s:%s', host, port)
});

module.exports = app;