var openWeather = require("./lib/openWeather");

module.exports = {
    passerelle: {
        temperatureActuelle: function (req, res, next) {
            var ville = req.params.ville;
            openWeather.temperatureActeulle(ville, function (err, data) {
                if (!err) {
                    res.json(data);
                    next();
                } else {
                    next(err);
                }
            });
        }
    }
};