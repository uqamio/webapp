var express = require('express'),
    app = express();
    
var moodle = require('./moodle/');

console.log(moodle);

var port = process.env.PORT || 3000,
    ip = process.env.IP || '127.0.0.1';
   
app.use('/api/moodle/cotes', moodle.passerelle.coteFinales);
   
app.use(express.static(process.env.REPERTOIRE_PUBLIC || './public/'));



var server = app.listen(port, ip, function () {
    console.log('YOUPPY!');
});

module.exports = app;