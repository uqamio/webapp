angular.module('baseApp')
    .controller('ConnexionController', ConnexionController);

ConnexionController.$inject = ['$scope', '$location', '$routeParams', 'Authentification'];

function ConnexionController($scope, $location, $routeParams, Authentification) {
    $scope.connecter = function (nomUsager, motPasse) {
        if (Authentification.authentifier(nomUsager, motPasse))
            $location.path($routeParams.returnUrl).search({});
    }
}