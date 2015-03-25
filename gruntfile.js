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
        'wiredep']);

    grunt.registerTask('buildDocs', [
        'jsdoc',
        'ngdoc'
    ]);

    grunt.registerTask('executerDev', [
        'env:dev',
        'express:dev',
        'open:dev',
        'watch']);

    grunt.registerTask('serve', function (target) {
        if (target === 'dev')
            grunt.task.run([
                'build',
                'executerDev']);
        else
            console.warn('Aucune cible de trouvé dans le démarage de grunt pour : «%s»', target);
    });

    grunt.registerTask('default', ['serve:dev']);

    grunt.registerTask('gruntDoc', [
        'jsdoc:grunt',
        'express:docGrunt',
        'open:docGrunt']);
};