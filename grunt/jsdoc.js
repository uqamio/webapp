/**
 * Permet de générer de la documentation en respectant la jsdoc.
 * JsDoc [JsDoc]{@link http://usejsdoc.org/index.html}
 * Voir [grunt-jsdoc]{@link https://www.npmjs.com/package/grunt-jsdoc}
 * @module grunt/jsdoc
 */

module.exports =
{
    serveur: {
        src: ['dist/**/*.js', '!dist/public/**/*'],
        options: {
            destination: 'documentation/serveur',
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