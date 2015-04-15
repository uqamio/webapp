module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    require('load-grunt-config')(grunt, {
        data: {
            repertoires: {
                client: 'client/',
                serveur: 'server/',
                distribution: 'dist/',
                test: 'tests/'
            }
        }
    });

    grunt.registerTask('build', [
        'clean',
        'copy',
        'injector',
        'wiredep']);

    grunt.registerTask('executerDev', [
        'env:dev',
        'express:dev',
        'open:dev',
        'watch']);

    grunt.registerTask('executerDebug', [
        'env:dev',
        'express:dev',
        'open:debug',
        'open:dev',
        'node-inspector']);

    grunt.registerTask('deploy', [
        'mocha_istanbul:coverage',
        'clean',
        'concurrent:deployDev',
        'sass:dist',
        'copy',
        'injector',
        'wiredep']);

    grunt.registerTask('serve', function (target) {
        if (target === 'dev') {
            grunt.task.run([
                'build',
                'sass:dist',
                'executerDev']);
        } else if (target === 'temoin') {
            //grunt.task.run(['mocha_istanbul:coverage',
            //    'build',
            //    'executerDev']);
        }
        else
            console.warn('Aucune cible de trouvé dans le démarage de grunt pour : «%s»', target);
    });

    grunt.registerTask('default', ['serve:dev']);
};