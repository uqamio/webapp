module.exports =
{
    debugNWatch: {
        tasks: [
            'node-inspector',
            'watch'
            ],
        options: {
            logConcurrentOutput: true
        }
    },
    deploy: {
        tasks: [
            'mocha_istanbul:coverage',
            'sass:dist',
            'jsdoc:serveur'
        ]
    }
};
