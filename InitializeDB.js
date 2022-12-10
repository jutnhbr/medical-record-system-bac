DBClient = require('mongodb').MongoClient;
require("dotenv").config();
//var connectionString = "mongodb://localhost:27017/advizDB";
//process.env.CONNECTION_STRING



let admins = [
    {username:"admin1", name:"Steve Rambo", hash:"password", salt:"salz",type:"admin"},
];

let doctors = [
    {username:"doctor1", name:"Johny Sins", hash:"password", salt:"salz",  patients: ["patient1","patient2"],type:"doctor"},
];

let patients = [
    {username:"patient1", versicherungsnummer:12345678, name:"Sweetie Fox", hash:"password", salt:"salz", roomNR:420, doctor:"doctor1",type:"patient"},
    {username:"patient2", versicherungsnummer:87654321, name:"Van Darkholm", hash:"password", salt:"salz", roomNR:69, doctor:"doctor1",type:"patient"}
];

let all = patients + admins + doctors

DBClient.connect(process.env.CONNECTION_STRING, function(err, db){
    if (err) throw err;

    console.log("Database created!");
    var dbobject = db.db("Medical-Record-System-Database");

    dbobject.collection("users").deleteMany({}, function(err, obj) {
        if (err) throw err;
    });
    dbobject.collection("users").insertMany(admins, function(err, res) {
        if (err) throw err;
        console.log("Inserted Items: " + res.insertedCount)

    });

    dbobject.collection("users").insertMany(doctors, function(err, res) {
        if (err) throw err;
        console.log("Inserted Items: " + res.insertedCount)

    });

    dbobject.collection("users").insertMany(patients, function(err, res) {
        if (err) throw err;
        console.log("Inserted Items: " + res.insertedCount)

    });

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