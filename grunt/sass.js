/**
 * Permets de compiler du sass et de publier les fichiers css.
 * Voir [grunt-contrib-sass]{@link https://www.npmjs.com/package/grunt-contrib-sass}
 * @module grunt/sass
 */

module.exports = {
    dist: {
        options: {
            style: 'expanded',
            trace: false,
            loadPath: 'client/bower_components/foundation/scss/'
        },
        files: [
            {
                expand: true,
                cwd: '<%= repertoires.client %>assets/css/',
                src: ['**/*.scss'],
                dest: '<%= repertoires.distribution %>public/css/',
                ext: '.css'
            }
        ]
    }
};