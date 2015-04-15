var fs = require('fs');


//Initialiser les variables d'exécution.
var emetteur = process.env.EMETTEUR || 'http://www.uqam.ca',
    calbackUrl = process.env.PROJET_USAGER_CALLBACK_URL;

/**
 * Simple, unobtrusive authentication for Node.js.
 * [passport]{@link https://www.npmjs.com/package/passport}
 * @module server
 */
var passport = require('passport'),
    /**
     * SAML 2.0 authentication strategy for Passport.
     * [passport-saml]{@link https://www.npmjs.com/package/passport-saml}
     * @module server
     */
    SamlStrategy = require('passport-saml').Strategy;




exports.creerPassport = function(){
    //Configurer passport
    passport.use(new SamlStrategy({
            entryPoint: 'https://code.uqam.ca/simplesaml/saml2/idp/SSOService.php',
            issuer: emetteur,
            callbackUrl: calbackUrl,
            identifierFormat: null,
            decryptionPvk: fs.readFileSync('/var/securite/certs/privatekey.pem', 'utf-8'),
            cert: fs.readFileSync('/var/securite/uqam/certs/code.uqam.ca.certificate', 'utf-8'),
            privateCert: fs.readFileSync('/var/securite/certs/privatekey.pem', 'utf-8')
        }, function (profile, done) {
            //Mapper les information SAML pour générer le token.
            var utilisateur = {
                codeUQAM: profile.userName,
                prenom: profile.givenName,
                nom: profile.sn,
                courriel: profile.mail
            };
            return done(null, utilisateur);
        })
    );
    return passport;
};