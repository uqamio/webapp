var path = require('path');

module.exports = {
    options: {
        // Override defaults here
    },
    dev: {
        options: {
            script: 'dist/app.js'
        }
    }
    //prod: {
    //    options: {
    //        script: 'path/to/prod/server.js',
    //        node_env: 'production'
    //    }
    //},
    //test: {
    //    options: {
    //        script: 'path/to/test/server.js'
    //    }
    //}
};