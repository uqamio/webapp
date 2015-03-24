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

    grunt.registerTask('build', [
        'clean',
        'copy',
        'sass',
        'injector',
        'wiredep',
        'jsdoc:dist']);

    grunt.registerTask('serve', function (target) {
        if (target === 'dev')
            grunt.task.run([
                'build',
                'executerDev']);
        else
            console.warn('Aucune cible de trouvé dans le démarage de grunt pour : «%s»', target);
    });

    grunt.registerTask('default', ['executerDev']);

    grunt.registerTask('gruntDoc', [
        'jsdoc:grunt',
        'express:docGrunt',
        'open:docGrunt']);
};