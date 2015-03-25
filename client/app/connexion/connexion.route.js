// route-config.js
angular.module('baseApp')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/connexion', {
            templateUrl: 'app/connexion/index.html',
            controller: 'ConnexionController'
        });
}