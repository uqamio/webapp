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
    /**
     * JSON Web Token implementation (symmetric and asymmetric).
     * [jsonwebtoken]{@link https://www.npmjs.com/package/jsonwebtoken}
     * @module server
     */
    jwt = require('jsonwebtoken');


//Inclusion des intergiciels
var fondation = require('./fondation'),
    journalisation = fondation.journalisation;

//Initialiser les variables d'exécution.
var port = process.env.PORT || 3000,
    emetteur = process.env.EMETTEUR || 'http://www.uqam.ca',
    repertoirePublic = process.env.REPERTOIRE_PUBLIC || './dist/app.js',
    secretClient = fs.readFileSync(path.resolve(__dirname, './configuration/securite/secretClient.certificate'));


//Configurer passport
passport.use(new SamlStrategy({
        entryPoint: 'https://code.uqam.ca/simplesaml/saml2/idp/SSOService.php',
        issuer: emetteur,
        callbackUrl: 'http://neo.dahriel.io/authentification',
        identifierFormat: null,
        decryptionPvk: fs.readFileSync(path.resolve(__dirname, 'configuration/securite/privatekey.pem'), 'utf-8'),
        cert: fs.readFileSync(path.resolve(__dirname, 'configuration/securite/code.uqam.ca.certificate'), 'utf-8'),
        privateCert: fs.readFileSync(path.resolve(__dirname, 'configuration/securite/privatekey.pem'), 'utf-8')
    }, function (profile, done) {
        var utilisateur = {
            codeUQAM: profile.userName,
            prenom: profile.givenName,
            nom: profile.sn,
            courriel: profile.mail
        };
        return done(null, utilisateur);
    })
);

//Configurer express
//Configurer le chemins des fichiers statiques html, css, js, images et autres.
app.use(express.static(path.resolve(__dirname, repertoirePublic)));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
    secret: 'On est open source.',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Configurer les chemins
app.get('/connection',
    passport.authenticate(['saml'], {
        failureRedirect: '/#/403'
    }), function (req, res) {
        res.end(201);
    });


app.post('/authentification',
    passport.authenticate('saml', {
        failureRedirect: '/#/403',
        session: false
    }),
    function (req, res) {
        log.info({req: req}, 'POST /authentification');
        var profile = {
                first_name: 'Étudian',
                last_name: 'Libre',
                email: 'libre.etudiant@uqam.ca',
                id: 123456
            },
            token = jwt.sign(req.user, secretClient, {expiresInMinutes: 60 * 5});
        res.redirect('/#/token/' + token);
    });

//On sécure tous les calls vers /api

//Démarrer le serveur
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    journalisation.info('On part le serveur! http://%s:%s.', host, port);
});

module.exports = app;