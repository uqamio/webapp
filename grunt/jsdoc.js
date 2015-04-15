/**
 * Permet de générer de la documentation en respectant la jsdoc.
 * JsDoc [JsDoc]{@link http://usejsdoc.org/index.html}
 * Voir [grunt-jsdoc]{@link https://www.npmjs.com/package/grunt-jsdoc}
 * @module grunt/jsdoc
 */

module.exports =
{
    serveur: {
        src: ['server/**/*.js'],
        options: {
            destination: './dist/public/documentation/serveur',
            template: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template",
            configure: "node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json"
        }
    }
};