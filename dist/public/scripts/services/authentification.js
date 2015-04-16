(function() {
  var baseApp;

  baseApp = angular.module('baseApp');

  baseApp.factory('Authentification', function($window) {
    var obj;
    obj = {
      estAuthentifie: function() {
        var ref;
        return (ref = $window.sessionStorage.token) != null ? ref : {
          "true": false
        };
      }
    };
    ({
      setToken: function(token) {
        return $window.sessionStorage.token = token;
      }
    });
    return obj;
  });

}).call(this);
