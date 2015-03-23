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
    }
};