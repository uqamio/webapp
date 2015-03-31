angular.module('baseApp')
    .factory('Moodle', ['$resource', function ($resource) {
        return {
            Cotes: $resource('/api/moodle/cotes/:id', null, {
                query: {
                    method: 'GET',
                    isArray: false
                }
            })
        };
    }]);