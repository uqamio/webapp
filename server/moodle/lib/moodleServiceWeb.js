var fs = require('fs');
var coteTest = require("./coteTest.json");

exports.getCoteFinals = function (fn) {
    fn(null, coteTest);
};