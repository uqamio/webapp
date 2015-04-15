var path = require('path');

/**
 * Permet de démarer des serveurs.
 * Voir [grunt-express-server]{@link https://www.npmjs.com/package/grunt-express-server}
 * @module grunt/express
 */

module.exports = {
    dev: {
        options: {
            script: 'dist/app.js',
            debug: true,
            node_env: 'development'
        }
    }
};