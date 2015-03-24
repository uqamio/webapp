var path = require('path');

/**
 * Permet de démarer des serveurs.
 * Voir [grunt-express-server]{@link https://www.npmjs.com/package/grunt-express-server}
 * @module grunt/express
 */

module.exports = {
    options: {
        // Override defaults here
    },
    dev: {
        options: {
            script: 'dist/app.js',
            debug: true,
            node_env: 'development'
        }
    },
    docGrunt: {
        options: {
            background: true,
            script: 'documentation/gruntDoc.js'
        }
    }
    //prod: {
    //    options: {
    //        script: 'path/to/prod/server.js',
    //        node_env: 'production'
    //    }
    //},
    //test: {
    //    options: {
    //        script: 'path/to/test/server.js'
    //    }
    //}
};