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
    journalisation = fondation.journalisation,
    passport = fondation.authentification.passport;

//Initialiser les variables d'exécution.
var port = process.env.PORT || 2015,
    repertoirePublic = process.env.REPERTOIRE_PUBLIC || './public',
    samelise = process.env.SAMLISE || false,
    secretClient = fs.readFileSync('/var/securite/certs/secretClient.certificate');

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

//Si l'app utilise l'authentification avec le projet usager.
if (samelise == 'true') {
    app.use(passport.initialize());
    app.use(passport.session());

    //chemin de déclanchement de l'authentification
    app.get('/connexion',
        passport.authenticate('saml', {
            failureRedirect: '/#/403'
        }), function (req, res) {
            res.end(201);
        });

    //Chemin de retour du porjet usager.
    app.post('/authentification',
        passport.authenticate('saml', {
            failureRedirect: '/#/403',
            session: false
        }),
        function (req, res) {
            token = jwt.sign(req.user, secretClient, {expiresInMinutes: 60 * 5});
            res.redirect('/#/token/' + token);
        });
}
//Créer un token temporaire
app.get('/tmptoken',
    function (req, res) {
        //Mapper les information SAML pour générer le token.
        var utilisateur = {
            codeUQAM: 'gj123456',
            prenom: 'Prénom',
            nom: 'Nom',
            courriel: 'nom.prenom@uqam.ca'
        };

        token = jwt.sign(utilisateur, secretClient, {expiresInMinutes: 60 * 5});
        res.redirect('/#/token/' + token);
    });

//Démarrer le serveur
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    journalisation.info('On part le serveur! http://%s:%s.', host, port);
});

module.exports = app;