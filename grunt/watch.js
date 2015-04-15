/**
 * Permets d'exécuter des tâches quand des dossiers et des fichiers ont été modifiés.
 * Voir [grunt-contrib-watch]{@link https://www.npmjs.com/package/grunt-contrib-watch}
 * @module grunt/watch
 */

module.exports = {
    options: {
        livereload: true
    },
    css: {
        files: [
            '<%= repertoires.client %>**/*.scss'
        ],
        tasks: [
            'sass:dist'
        ]
    },
    html: {
        files: [
            '<%= repertoires.client %>**/*.html'
        ],
        tasks: [
            'build'
        ]
    },
    scripts: {
        files: [
            '<%= repertoires.client %>app/**/*.js'
        ],
        tasks: [
            'build'
        ]
    },
    serveur: {
        files: [
            '<%= repertoires.serveur %>**/*.js'],
        tasks: ['copy:serverApp', 'express:dev'],
        options: {
            spawn: false
        }
    }
};