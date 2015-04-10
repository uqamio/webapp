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
     * Middleware that validates JsonWebTokens and sets req.user.
     * [express-jwt]{@link https://www.npmjs.com/package/express-jwt}
     * @module server
     */
    expressJwt = require('express-jwt'),
    /**
     * JSON Web Token implementation (symmetric and asymmetric).
     * [jsonwebtoken]{@link https://www.npmjs.com/package/jsonwebtoken}
     * @module server
     */
    jwt = require('jsonwebtoken'),
    /**
     * a JSON logging library for node.js services.
     * [bunyan]{@link https://www.npmjs.com/package/bunyan}
     * @module server
     */
    bunyan = require('bunyan');


//Inclusion des intergiciels
var fondation = require('./fondation'),
    journalisation = fondation.journalisation;

//Initialiser les variables d'exécution.
var port = process.env.PORT || 3000,
    emetteur = process.env.EMETTEUR || 'http://www.uqam.ca',
    repertoirePublic = process.env.REPERTOIRE_PUBLIC || './dist/app.js',
    secretClient = fs.readFileSync(path.resolve(__dirname, 'configuration/securite/secretClient.crt'));

//Configurer bunyan
var log = bunyan.createLogger({
    name: 'devServeur',
    serializers: {
        req: bunyan.stdSerializers.req,
        res: bunyan.stdSerializers.res
    }
});

//Configurer passport
passport.use(new SamlStrategy({
        path: '/authentification',
        entryPoint: 'https://code.uqam.ca/simplesaml/saml2/idp/SSOService.php',
        issuer: emetteur,
        protocol: 'http://',
        cert: fs.readFileSync(path.resolve(__dirname, 'configuration/securite/certificat.crt'), 'utf-8')
    }, function (profile, done) {
        log.info('Dans SamlStrategy', profile, done);
        return done(null, profile);
    })
);

//Configurer express
//Configurer le chemins des fichiers statiques html, css, js, images et autres.
app.use(express.static(path.resolve(__dirname, repertoirePublic)));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'On est open source.',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//Configurer les chemins
app.get('/authentification',
    passport.authenticate(['saml'], {
        failureRedirect: '/#401',
        failureFlash: false
    }), function (req, res) {
        res.end(201);
    });

app.post('/authentification',
    passport.authenticate('saml', {
        failureRedirect: '/authentification',
        failureFlash: true,
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
            token = jwt.sign(profile, secretClient, {expiresInMinutes: 60 * 5});
        res.setHeader('Connection', 'close');
        res.redirect(303, '/#/token/' + token);
        res.end();
    });

//On sécure tous les calls vers /api

//Démarrer le serveur
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('On part! http://%s:%s', host, port)
});

module.exports = app;