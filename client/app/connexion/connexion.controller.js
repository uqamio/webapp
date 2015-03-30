angular.module('baseApp')
    .controller('ConnexionController', ConnexionController);

ConnexionController.$inject = ['$scope', '$http', '$window' , '$routeParams', 'Authentification'];

function ConnexionController($scope, $http, $window) {
    $scope.connecter = function () {
        $http.post('/authentification', {})
            .success(function (data, status, headers, config) {
                console.log('data', data);
                console.log('token', $window.sessionStorage.token);
                $window.sessionStorage.token = data.token;
                console.log('token', $window.sessionStorage.token);
                $scope.message = 'Welcome';
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
                // Handle login errors here
                $scope.message = 'Error: Invalid user or password';
            });
    }
}