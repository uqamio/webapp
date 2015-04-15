angular.module('baseApp').
    factory('Authentification', function ($window) {
        return {
            estAuthentifie: function () {
                return ($window.sessionStorage.token) ? true : false;
            },
            setToken: function(token){
                $window.sessionStorage.token = token;
            }
        }
    });