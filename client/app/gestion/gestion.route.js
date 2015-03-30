// route-config.js
angular.module('baseApp')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/gestion', {
            templateUrl: 'app/gestion/index.html',
            controller: 'GestionController',
            authentificationRequise: true
        });
}