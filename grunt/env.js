/**
 * Permets d'enregistrer des variables d'environnement utilisées lors de l'exécution.
 * Voir [grunt-env]{@link https://www.npmjs.com/package/grunt-env}
 * @module grunt/env
 */
module.exports = {
    options: {
        //Shared Options Hash
    },
    dev: {
        NODE_ENV: 'development',
        IP: '127.0.0.1',
        PORT: 3000,
        REPERTOIRE_PUBLIC: './public',
        EMETTEUR: 'http://neo.dahriel.io'
    }
};