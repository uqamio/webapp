/**
 * Permet de copier des fichiers. Pricipalemeent les fichiers de travail et les transférer dans le dossier de distribution.
 * Voir [grunt-contrib-copy]{@link https://www.npmjs.com/package/grunt-contrib-copy}
 * @module grunt/copy
 */
module.exports = {
    clientApp: {
        files: [
            {
                expand: true,
                cwd: '<%= repertoires.client %>',
                src: [
                    'app/**/*.js',
                    '!app/**/*.spec.js'
                ],
                dest: '<%= repertoires.distribution %>public/scripts/'
            },
            {
                expand: true,
                cwd: '<%= repertoires.client %>',
                src: [
                    '**/*.html',
                    'bower_components/**/*',
                    '*.ico'
                ],
                dest: '<%= repertoires.distribution %>public/'
            },
            {
                expand: true,
                cwd: '<%= repertoires.client %>assets',
                src: [
                    'images/**/*{.png,.jpg}'
                ],
                dest: '<%= repertoires.distribution %>public/'
            }
        ]
    },
    serverApp: {
        files: [
            {
                expand: true,
                cwd: '<%= repertoires.serveur %>',
                src: [
                    '**/*.{js,json,md}',
                    '!**/*.spec.js'
                ],
                dest: '<%= repertoires.distribution %>'
            }]
    }
};