DBClient = require('mongodb').MongoClient;
require("dotenv").config();
//var connectionString = "mongodb://localhost:27017/advizDB";
//process.env.CONNECTION_STRING



let admins = [
    {username:"admin1", name:"Steve Rambo", hash:"password", salt:"salz", admin:true},
];

let doctors = [
    {username:"doctor1", name:"Johny Sins", hash:"password", salt:"salz", doctor:true,  patients: ["patient1","patient2"]},
];

let patients = [
    {username:"patient1", name:"Sweetie Fox", hash:"password", salt:"salz", patient:true, roomNR:420, doctor:"doctor1"},
    {username:"patient2", name:"Van Darkholm", hash:"password", salt:"salz", patient:true, roomNR:69, doctor:"doctor1"}
];


DBClient.connect(process.env.CONNECTION_STRING, function(err, db){
    if (err) throw err;

    console.log("Database created!");
    var dbobject = db.db("Medical-Record-System-Database");

    dbobject.collection("admins").deleteMany({}, function(err, obj) {
        if (err) throw err;
    });
    dbobject.collection("admins").insertMany(admins, function(err, res) {
        if (err) throw err;
        console.log("Inserted Items (Admins): " + res.insertedCount)

    });

    dbobject.listCollections({name: "admins"})
        .next(function(err, collinfo) {
            if (collinfo) {
                // The collection exists
                console.log("Table admins already exists!");
            }else{
                dbobject.createCollection("admins", function(err, res){
                    if (err) throw err;
                    console.log("Table admins was created!");
                });
            }
        });




    //----------------------------------------------------------

    dbobject.collection("doctors").deleteMany({}, function(err, obj) {
        if (err) throw err;
    });


    dbobject.listCollections({name: "doctors"})
        .next(function(err, collinfo) {
            if (collinfo) {
                // The collection exists
                console.log("Table patients already exists!");
            }else{
                dbobject.createCollection("doctors", function(err, res){
                    if (err) throw err;
                    console.log("Table doctors was created!");
                });
            }
        });

    dbobject.collection("doctors").insertMany(doctors, function(err, res) {
        if (err) throw err;
        console.log("Inserted Items (doctors): " + res.insertedCount)

    });

    //------------------------------------------------------------------------------------------------------------------


    dbobject.collection("patients").deleteMany({}, function(err, obj) {
        if (err) throw err;
    });
    dbobject.collection("patients").insertMany(patients, function(err, res) {
        if (err) throw err;
        console.log("Inserted Items (Patients): " + res.insertedCount)
        db.close();

    });

    dbobject.listCollections({name: "patients"})
        .next(function(err, collinfo) {
            if (collinfo) {
                // The collection exists
                console.log("Table patients already exists!");
            }else{
                dbobject.createCollection("patients", function(err, res){
                    if (err) throw err;
                    console.log("Table patients was created!");
                });
            }
        });








});