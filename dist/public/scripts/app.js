(function() {
  angular.module('baseApp', ['ngRoute', 'ngResource']);

}).call(this);

(function() {
  var baseApp;

  baseApp = angular.module("baseApp");

  baseApp.run([
    '$rootScope', '$location', 'Authentification', function($rootScope, $location, Authentification) {
      return $rootScope.$on('$routeChangeStart', function(event, next) {
        if (next) {
          if (next.authentificationRequise && !Authentification.estAuthentifie()) {
            event.preventDefault();
            return $location.path('/connexion').search({
              returnUrl: next.originalPath
            });
          }
        }
      });
    }
  ]);

  baseApp.config([
    '$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
      $httpProvider.interceptors.push('AuthIntercepteur');
      return $routeProvider.otherwise({
        templateUrl: 'app/404/index.html'
      });
    }
  ]);

}).call(this);
