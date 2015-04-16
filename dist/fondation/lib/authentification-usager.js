(function() {
  var SamlStrategy, calbackUrl, emetteur, fs, passport;

  fs = require('fs');

  emetteur = process.env.EMETTEUR || 'http://www.uqam.ca';

  calbackUrl = process.env.PROJET_USAGER_CALLBACK_URL;

  passport = require('passport');

  SamlStrategy = require('passport-saml').Strategy;

  exports.creerPassport = function() {
    passport.use(new SamlStrategy({
      entryPoint: 'https://code.uqam.ca/simplesaml/saml2/idp/SSOService.php',
      issuer: emetteur,
      callbackUrl: calbackUrl,
      identifierFormat: null,
      decryptionPvk: fs.readFileSync('/var/securite/certs/privatekey.pem', 'utf-8'),
      cert: fs.readFileSync('/var/securite/uqam/certs/code.uqam.ca.certificate', 'utf-8'),
      privateCert: fs.readFileSync('/var/securite/certs/privatekey.pem', 'utf-8')
    }, function(profile, done) {
      var utilisateur;
      utilisateur = {
        codeUQAM: profile.userName,
        prenom: profile.givenName,
        nom: profile.sn,
        courriel: profile.mail
      };
      return done(null, utilisateur);
    }));
    return passport;
  };

}).call(this);
