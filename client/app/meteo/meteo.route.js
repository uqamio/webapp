// route-config.js
angular.module('baseApp')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/meteo', {
            templateUrl: 'app/meteo/index.html',
            controller: 'MeteoController',
            authentificationRequise: true
        });
}