var express = require('express'),
    app = express();

var moodle = require('./moodle/');

var port = process.env.PORT || 3000,
    ip = process.env.IP || '127.0.0.1';

app.use(express.static(process.env.REPERTOIRE_PUBLIC));


//Configurer les intergiciels
app.use('/api/moodle/grades', function(req,res, next) {
    moodle.getNote();
});

var server = app.listen(port, ip, function () {
    console.log('YOUPPY!');
});

module.exports = app;