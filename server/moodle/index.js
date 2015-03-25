var moodleWS = require("./lib/moodleServiceWeb");

module.exports = {
    passerelle: {
        coteFinals: function (req, res, next) {
            moodleWS.getCoteFinals(function (err, data) {
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