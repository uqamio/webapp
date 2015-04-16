baseApp = angular.module "baseApp"

baseApp.run(['$rootScope', '$location', 'Authentification',
  ($rootScope, $location, Authentification) ->
    $rootScope.$on('$routeChangeStart', (event, next) ->
      if (next)
        if (next.authentificationRequise && !Authentification.estAuthentifie())
          event.preventDefault()
          $location.path('/connexion').search({returnUrl: next.originalPath})
    )
])

baseApp.config(['$routeProvider', '$httpProvider',
  ($routeProvider, $httpProvider) ->
    $httpProvider.interceptors.push('AuthIntercepteur');
    $routeProvider.
    otherwise({
        templateUrl: 'app/404/index.html'
      });
]);