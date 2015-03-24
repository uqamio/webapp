var express = require('express');
var app = express();

var port = process.env.PORT || 3000,
    ip = process.env.IP || '127.0.0.1';
    
app.use(express.static('./dist/public'));

var server = app.listen(port, ip, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Début de l\'écoute 4 http://%s:%s', host, port);

});

module.exports = app;