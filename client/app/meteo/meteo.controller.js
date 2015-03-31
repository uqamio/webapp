
var baseApp = angular.module('baseApp');

baseApp.controller('MeteoController', MeteoController);

MeteoController.$inject = ['$scope', 'Meteo'];


/**
 * @ngdoc controller
 * @function
 * @description
 * Desc
 */
function MeteoController($scope, Meteo) {
    $scope.salut = 'Bienvenue dans la section de Méteo';
    $scope.villes = [
        'Montreal,Qc',
        'Paris,Fr',
        'New-York,Nyc'
    ];

    $scope.getTemperature = function(ville){
        Meteo.Temperature.get({ville: ville}, function (temperature) {
            if (temperature.status == 'success'){
                $scope.temperature = temperature.data;
            }

        });
    }
}