var util = require('util');

/**
 * Permets d'injecter les ressources dans le fichier HTML.
 * Voir [grunt-injector]{@link https://www.npmjs.com/package/grunt-injector}
 * @module grunt/injector
 */

module.exports = {
    scripts: {
        options: {
            transform: function (filePath) {
                filePath = filePath.replace('/dist/public/', '');
                return util.format('<script src="%s"></script>', filePath);
            }
        },
        files: {
            '<%= repertoires.distribution %>public/index.html': [
                '<%= repertoires.distribution %>public/scripts/**/*.js',

            ]
        }
    },
    css: {
        options: {
            transform: function(filePath) {
                filePath = filePath.replace('/dist/public/', '');
                return util.format('<link rel="stylesheet" href="%s">', filePath);
            }
        },
        files: {
            '<%= repertoires.distribution %>public/index.html': [
                '<%= repertoires.distribution %>public/css/**/*.css'
            ]
        }
    }
};