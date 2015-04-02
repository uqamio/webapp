var should = require('should');

var ow = require('./openWeather');

describe('galaxy', function () {

    describe('earth', function () {

        it('Additionne', function (done) {
            ow.add(2, 2).should.equal(4);
            done();
        });
    });
});