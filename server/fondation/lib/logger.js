var path = require('path');
/**
 * A multi-transport async logging library for Node.js
 * [winston]{@link https://www.npmjs.com/package/winston}
 * @module server
 */
var winston = require('winston');

//Configurer winston
module.exports = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            name:'erreurs-log',
            filename: path.resolve(process.cwd(), './server/logs/error.log'),
            json: true,
            level: 'error'
        }),
        new (winston.transports.File)({
            name:'avertissements-log',
            filename: path.resolve(process.cwd(), './server/logs/warn.log'),
            json: true,
            level: 'warn'
        }),
        new (winston.transports.File)({
            name:'infos-log',
            filename: path.resolve(process.cwd(), './server/logs/info.log'),
            json: true,
            level: 'info'
        })
    ]
});