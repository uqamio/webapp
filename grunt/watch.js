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
};