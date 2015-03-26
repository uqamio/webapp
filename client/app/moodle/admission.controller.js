var baseApp = angular.module('baseApp');

baseApp.controller('AdmissionController', AdmissionController);

AdmissionController.$inject = ['$scope', 'Moodle'];

function AdmissionController($scope, Moodle) {
    Moodle.Cotes.query(function (cotesJsend) {
        if (cotesJsend.status == 'success')
            $scope.cotes = cotesJsend.data.finalgrades;
    });
}