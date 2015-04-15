// route-config.js
angular.module('baseApp')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'app/accueil/index.html',
            controller: 'AccueilController'
        })
        .when('/token/:token', {
            templateUrl: 'app/accueil/index.html',
            controller: 'AccueilController'
        });
}