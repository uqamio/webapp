var baseApp = angular.module('baseApp');

baseApp.controller('MoodleController', MoodleController);

function MoodleController($scope) {
    $scope.inc = 0;
    $scope.coucou = 'COUCOU 4!';

    $scope.clique = function(){
        $scope.inc++;
    }
}