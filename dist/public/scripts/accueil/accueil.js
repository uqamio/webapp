(function() {
  var AccueilController, baseApp;

  baseApp = angular.module('baseApp');

  AccueilController = function($scope, $routeParams, Authentification) {
    if ($routeParams.token) {
      return Authentification.setToken($routeParams.token);
    }
  };

  AccueilController.$inject = ['$scope', '$routeParams', 'Authentification'];

  baseApp.controller('AccueilController', AccueilController);

}).call(this);

(function() {
  var configuration;

  configuration = function($routeProvider) {
    return $routeProvider.when('/', {
      templateUrl: 'app/accueil/index.html',
      controller: 'AccueilController'
    }).when('/token/:token', {
      templateUrl: 'app/accueil/index.html',
      controller: 'AccueilController'
    });
  };

  configuration.$inject = ['$routeProvider'];

  (angular.module('baseApp')).config(configuration);

}).call(this);
