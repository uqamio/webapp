module.exports = {
    dev: {
        path: 'http://localhost:3000',
        app: 'Google Chrome'
    },
    build: {
        path: 'http://google.com/',
        app: 'Firefox'
    },
    file: {
        path: '/etc/hosts'
    },
    custom: {
        path: function () {
            return grunt.option('path');
        }
    }

};