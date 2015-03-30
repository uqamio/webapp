
var baseApp = angular.module('baseApp');

baseApp.controller('GestionController', GestionController);

GestionController.$inject = ['$scope'];


/**
 * @ngdoc controller
 * @function
 * @description
 * Desc
 */
function GestionController($scope) {
    $scope.salut = 'Bienvenue dans la section de gestion';
}