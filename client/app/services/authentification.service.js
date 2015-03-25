angular.module('baseApp').
    factory('Authentification', function () {
        var _utilisateur = null;
        return {
            authentifier: function(username, password){
                if( username === password){
                    _utilisateur = username;
                    return true;
                } else {
                    return false;
                }
            },
            setUtilisateur: function (utilisateur) {
                _utilisateur = utilisateur;
            },
            estAuthentifie: function () {
                return (!_utilisateur) ? false : true;
            }
        }
    });