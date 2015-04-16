baseApp = angular.module 'baseApp'

AccueilController = ($scope, $routeParams, Authentification) ->
  if ($routeParams.token)
    Authentification.setToken($routeParams.token);

AccueilController.$inject = ['$scope', '$routeParams', 'Authentification']

baseApp.controller('AccueilController', AccueilController)