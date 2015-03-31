/**
 * Permets d'ouvrir le fureteur à une page donnée.
 * Voir [grunt-open]{@link https://www.npmjs.com/package/grunt-open}
 * @module grunt/open
 */

module.exports = {
    dev: {
        path: 'http://localhost:3000'
    },
    docGrunt: {
        path: 'documentation/grunt/index.html'
    },
    build: {
        path: 'http://google.com/'
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