angular.module("baseApp")
    .run(['$rootScope', '$location', 'Authentification',
        function ($rootScope, $location, Authentification) {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (next) {
                    if (next.authentificationRequise && !Authentification.estAuthentifie()) {
                        event.preventDefault();
                        $location.path('/connexion').search({returnUrl: next.originalPath});
                    }
                }
            });
        }])
    .config(['$routeProvider', '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $httpProvider.interceptors.push('AuthIntercepteur');
            $routeProvider.
                otherwise({
                    templateUrl: 'app/404/index.html'
                });
        }]);