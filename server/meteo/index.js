var openWeather = require("./lib/openWeather");

/**
 * Façade vers le microservice de météo.
 * @module server/meteo
 * @type {{passerelle: {temperatureActuelle: Function}}}
 */
module.exports = {
    passerelle: {
        /**
         * Fonction qui fait le lien entre l'api de météo et express
         * @param req - La requête express
         * @param res - La réponse express
         * @param next - La fonction vers le prochain middleware
         */
        temperatureActuelle: function (req, res, next) {
            var ville = req.params.ville;
            openWeather.temperatureActeulle(ville, function (err, data) {
                if (!err) {
                    res.json({
                        status : 'success',
                        data: data
                    });
                    next();
                } else {
                    next(err);
                }
            });
        }
    }
};