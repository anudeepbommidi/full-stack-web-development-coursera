var MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

//Connection url
var url = 'mongodb://localhost:27017/conFusion';

MongoClient.connect(url, function(err, db) {

    assert.equal(err, null);
    console.log("Correctly connected to the server!");

    var collection = db.collection("dishes");

    collection.insertOne({"name":"Uthapizza", "description":"It's a tasty dish!"}, function(err, result) {
        assert.equal(err, null);
        console.log("After insert: ");
        console.log(result.ops);

        collection.find({}).toArray(function(err, docs) {
            assert.equal(err, null);
            console.log("Found: ");
            console.log(docs);

            db.dropCollection("dishes", function(err, result) {
                assert.equal(err, null);
                console.log("Dishes collection dropped");
                db.close();
            });
        });

    });

});