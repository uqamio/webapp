
/**
 * Comme [injector]{@link module:grunt/injector} spécifiquement pour bower.
 * Voir [grunt-wiredep]{@link https://www.npmjs.com/package/grunt-wiredep}
 * @module grunt/wiredep
 */

module.exports = {

    target: {
        src: ['<%= repertoires.distribution %>public/index.html'],
        ignorePath: '../../<%= repertoires.client %>',
        exclude: ['foundation.css']
    }

};