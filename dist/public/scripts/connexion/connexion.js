(function() {
  var ConnexionController, baseApp;

  baseApp = angular.module('baseApp');

  ConnexionController = function($scope, $http, $window) {
    return $scope.connecter = function() {
      return $http.post('/authentification', {}).success(function(data, status, headers, config) {
        $window.sessionStorage.token = data.token;
        console.log('token', $window.sessionStorage.token);
        return $scope.message = 'Welcome';
      }).error(function(data, status, headers, config) {
        delete $window.sessionStorage.token;
        return $scope.message = 'Error: Invalid user or password';
      });
    };
  };

  ConnexionController.$inject = ['$scope', '$http', '$window', '$routeParams', 'Authentification'];

  baseApp.controller('ConnexionController', ConnexionController);

}).call(this);

(function() {
  var configuration;

  configuration = function($routeProvider) {
    return $routeProvider.when('/connexion', {
      templateUrl: 'app/connexion/index.html',
      controller: 'ConnexionController'
    });
  };

  configuration.$inject = ['$routeProvider'];

  (angular.module('baseApp')).config(configuration);

}).call(this);
