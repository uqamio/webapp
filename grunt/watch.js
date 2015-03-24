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
    express: {
        files:  [ './server/app.js' ],
        tasks:  [ 'copy:serverApp', 'express:dev' ],
        options: {
            spawn: false
        }
    }
};