/**
 * Permets d'enregistrer des variables d'environnement utilisées lors de l'exécution.
 * Voir [grunt-env]{@link https://www.npmjs.com/package/grunt-env}
 * @module grunt/env
 */
module.exports = {
    dev: {
        NODE_ENV: 'development',
        PORT: 2015,
        REPERTOIRE_PUBLIC: './public'
    }
};