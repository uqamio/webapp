/**
 * Permets d'ouvrir le fureteur à une page donnée.
 * Voir [grunt-open]{@link https://www.npmjs.com/package/grunt-open}
 * @module grunt/open
 */

module.exports = {
    dev: {
        path: 'http://localhost:3000'
    },
    debug: {
        path: 'http://127.0.0.1:8080/debug?port=5858'
    },
    docGrunt: {
        path: 'documentation/grunt/index.html'
    },
    build: {
        path: 'http://google.com/'
    },
    coverage: {
        path: './coverage/lcov-report/index.html'
    },
    custom: {
        path: function () {
            return grunt.option('path');
        }
    }

};