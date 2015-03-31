angular.module('baseApp')
    .factory('Meteo', ['$resource', function ($resource) {
        return {
            Temperature: $resource('/api/meteo/temperature/:ville')
        };
    }]);