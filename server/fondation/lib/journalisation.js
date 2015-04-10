var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

var url = 'mongodb://gab:12345@mongobd.dahriel.io:49154/journalisation';


var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('acces');
    // Insert some documents
    collection.insert([
        {a: 1}, {a: 2}, {a: 3}
    ], function (err, result) {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document collection");
        callback(result);
    });
}

exports.connecter = function () {
    // Connection URL

// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        insertDocuments(db, function () {
            db.close();
        });
    });
}

