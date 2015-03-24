module.exports = {
    dist: {
        options: {
            style: 'expanded',
            trace: false,
            loadPath: 'client/bower_components/foundation/scss/'
        },
        // Dictionary of files
        files: [
            // 'destination': 'source'
            //'<%= repertoires.distribution %>public/css/styles.css': '<%= repertoires.client %>**/*.scss'
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