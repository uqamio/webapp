var express = require('express'),
    app = express();

var port = process.env.PORT || 3000;

app.use(express.static(process.env.REPERTOIRE_PUBLIC));

var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('On part! http://%s:%s', host, port)
});

module.exports = app;