
baseApp = angular.module 'baseApp'
baseApp.config(config);

config = ($routeProvider) ->
  $routeProvider
  .when('/', {
      templateUrl: 'app/accueil/index.html',
      controller: 'AccueilController'
    })
  .when('/token/:token', {
      templateUrl: 'app/accueil/index.html',
      controller: 'AccueilController'
    });

  config.$inject = ['$routeProvider'];
