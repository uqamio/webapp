var util= require('util');

var request = require('request');

var queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=%s';   //%s = ville

exports.temperatureActeulle = function (ville, fn) {
    request(util.format(queryUrl, ville), function (error, response, body) {
        if (!error && response.statusCode == 200) {
           fn(null, {
               status : 'success',
               data: JSON.parse(body)
           });
        } else {
            fn(error, body);
        }
    });
};