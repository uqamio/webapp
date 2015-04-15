// Generated by CoffeeScript 1.9.1
(function() {
  var baseApp, config;

  baseApp = angular.module('baseApp');

  baseApp.config(config);

  config = function($routeProvider) {
    $routeProvider.when('/', {
      templateUrl: 'app/accueil/index.html',
      controller: 'AccueilController'
    }).when('/token/:token', {
      templateUrl: 'app/accueil/index.html',
      controller: 'AccueilController'
    });
    return config.$inject = ['$routeProvider'];
  };

}).call(this);

//# sourceMappingURL=accueil.route.js.map
