var baseApp = angular.module('baseApp');

baseApp.controller('AccueilController', AccueilController);

AccueilController.$inject = ['$scope', '$routeParams', 'Authentification'];


/**
 * @ngdoc controller
 * @function
 * @description
 * Resize textarea automatically to the size of its text content.
 */
function AccueilController($scope, $routeParams, Authentification) {
    if ($routeParams.token)
        Authentification.setToken($routeParams.token);
}