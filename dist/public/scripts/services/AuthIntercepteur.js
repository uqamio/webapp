(function() {
  var baseApp;

  baseApp = angular.module('baseApp');

  baseApp.factory('AuthIntercepteur', function($rootScope, $q, $window) {
    var obj;
    obj = {
      request: function(config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
      },
      response: function(response) {
        return response || $q.when(response);
      }
    };
    return obj;
  });

}).call(this);
