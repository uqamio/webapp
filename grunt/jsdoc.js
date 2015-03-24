module.exports =
{
    dist: {
        src: ['dist/scripts/**/*.js', '!dist/public/bower_components/**/*'],
        options: {
            destination: 'documentation/',
            template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
            configure: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
        }
    },
    grunt:{
        src: ['grunt/**/*.js'],
        options: {
            destination: 'documentation/grunt/',
            template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
            configure: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
        }
    }
};