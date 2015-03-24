var express = require('express');
var app = express();

var port = process.env.PORT || 3000,
    ip = process.env.IP || '127.0.0.1';
    
app.use(express.static(process.env.REPERTOIRE_PUBLIC));

var server = app.listen(port, ip, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Début de l\'écoute http://%s:%s', host, port);

});

module.exports = app;