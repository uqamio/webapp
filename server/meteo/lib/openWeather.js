var util= require('util');

var request = require('request');

var queryUrl = 'http://api.openweathermap.org/data/2.5/weather?q=%s';   //%s = ville

/**
 * Petite fonction qui va lire vers l'api REST d'OpenWeather.
 * @module server/meteo/lib
 * @param ville - le nom de la ville recherchée pour afficher la température
 * @param fn - La fonction de retour
 */
exports.temperatureActeulle = function (ville, fn) {
    request(util.format(queryUrl, ville), function (error, response, body) {
        if (!error && response.statusCode == 200) {
           fn(null, JSON.parse(body));
        } else {
            fn(error, body);
        }
    });
};

exports.add = function (a, b, fn) {
   return a + b
};