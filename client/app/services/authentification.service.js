angular.module('baseApp').
    factory('Authentification', function ($window) {
        return {
            estAuthentifie: function () {
                return ($window.sessionStorage.token) ? true : false;
            }
        }
    });