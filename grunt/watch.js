/**
 * Permets d'exécuter des tâches quand des dossiers et des fichiers ont été modifiés.
 * Voir [grunt-contrib-watch]{@link https://www.npmjs.com/package/grunt-contrib-watch}
 * @module grunt/watch
 */

module.exports = {
    css: {
        files: [
            '<%= repertoires.client %>**/*.scss'
        ],
        tasks: [
            'sass:dist'
        ],
        options: {
            livereload: true
        }
    },
    html: {
        files: [
            '<%= repertoires.client %>**/*.html'
        ],
        tasks: [
            'build'
        ],
        options: {
            livereload: true
        }
    },
    scripts: {
        files: [
            '<%= repertoires.client %>app/**/*.js',
        ],
        tasks: [
            'build'
        ],
        options: {
            livereload: true
        }
    },
    serveur: {
        files: [
            '<%= repertoires.serveur %>app.js',
            '<%= repertoires.serveur %>vues/**/*.jade'],
        tasks: ['copy:serverApp', 'express:dev'],
        options: {
            spawn: false
        }
    }
};