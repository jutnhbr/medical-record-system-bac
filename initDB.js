DBClient = require('mongodb').MongoClient;
const {insertAdmin, insertDoctor, insertPatient} = require('./insertDB');
require("dotenv").config();





DBClient.connect(process.env.DB_STRING, function(err, db){
    if (err) throw err;

    console.log("Database created!");
    var dbobject = db.db("Medical-Record-System-Database");

    dbobject.collection("users").deleteMany({}, function(err, obj) {
        if (err) throw err;
    });

    insertDoctor("Do", "Moe", "test123", ["12345678", "54634234"])
    insertDoctor("Piet", "Foo", "test123", ["65656354", "23434516"])
    insertDoctor("Dave", "So", "test123", ["75425454", "65325554"])

    insertPatient("12345678", "john", "doe", "test123", "54", "Doc Moe")
    insertPatient("54634234", "johnny", "foe", "test123", "33", "Doc Moe")
    insertPatient("65656354", "kevin", "exam", "test123", "15", "Piet Foo")
    insertPatient("23434516", "devin", "too", "test123", "5", "Piet Foo")
    insertPatient("75425454", "dennis", "voo", "test123", "45", "Dave So")
    insertPatient("65325554", "morris", "doo", "test123", "61", "Dave So")

    insertAdmin("cooladmin", "test123")

    dbobject.listCollections({name: "users"})
        .next(function(err, collinfo) {
            if (collinfo) {
                // The collection exists
                console.log("Table users already exists!");
            }else{
                dbobject.createCollection("users", function(err, res){
                    if (err) throw err;
                    console.log("Table users was created!");
                });
            }
        });
});

