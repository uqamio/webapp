baseApp = angular.module 'baseApp'
baseApp.config(config);

config = ($routeProvider) ->
  $routeProvider
  .when('/connexion', {
      templateUrl: 'app/connexion/index.html',
      controller: 'ConnexionController'
    });

config.$inject = ['$routeProvider'];
