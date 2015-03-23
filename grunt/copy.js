module.exports = {
    clientApp: {
        files: [
            {
                expand: true,
                cwd: '<%= repertoires.client %>',
                src: 'app/**/*.js',
                dest: '<%= repertoires.distribution %>public/scripts/'
            },
            {
                expand: true,
                cwd: '<%= repertoires.client %>',
                src: [
                    '**/*.html',
                    'bower_components/**/*'
                    ],
                dest: '<%= repertoires.distribution %>public/'
            }]
    },
    serverApp: {
        files: [
            {
                expand: true,
                cwd: '<%= repertoires.server %>',
                src: '**/*.js',
                dest: '<%= repertoires.distribution %>'
            }]
    }
};