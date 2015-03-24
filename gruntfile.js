module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('load-grunt-config')(grunt, {
        data: {
            repertoires: {
                client: 'client/',
                server: 'server/',
                distribution: 'dist/'
            }
        }
    });
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('build', [
        'clean',
        'copy',
        'sass',
        'injector',
        'wiredep']);

    grunt.registerTask('serve', function(target) {
        grunt.task.run(['build','express:dev', 'watch']);
    });
};