// route-config.js
angular.module('baseApp')
    .config(config);

config.$inject = ['$routeProvider'];

function config($routeProvider) {
    $routeProvider
        .when('/moodle', {
            templateUrl: 'app/moodle/index.html',
            controller: 'MoodleController'
        })
        .when('/moodle/admission', {
            templateUrl: 'app/moodle/admission.html',
            controller: 'AdmissionController',
            authentificationRequise: true
        });
}