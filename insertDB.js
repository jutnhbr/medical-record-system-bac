// Import the MongoDB library
const {genPassword} = require("./lib/passwordUtils");
const MongoClient = require('mongodb').MongoClient;

// Define the function that inserts an object into a MongoDB collection
const insertAdmin = (username, password) => {
    // Connect to the MongoDB server
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
        if (err) return (err);

        // Select the "users" collection from the database
        const collection = client.db("E-Akte").collection("users");

        // Generate the password hash and salt
        const { hash, salt } = genPassword(password);

        // Create the object to be inserted
        const user = {
            username: username,
            hash: hash,
            salt: salt,
            type: "admin"
        };

        // Insert the object into the collection
        collection.insertOne(user, (err, result) => {
            if (err) return (err);

            // Return the result of the insertion
            return (result);
        });
    });
}

const insertDoctor = (firstname, lastname, password, patients) => {
    // Connect to the MongoDB server
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
        if (err) return (err);

        // Select the "users" collection from the database
        const collection = client.db("E-Akte").collection("users");

        // Generate the password hash and salt
        const {hash, salt} = genPassword(password);

        // Create the object to be inserted
        const user = {
            username: "doc_" + firstname,
            name: firstname,
            lastname: lastname,
            fullname: firstname + " " + lastname,
            hash: hash,
            salt: salt,
            patients: patients,
            type: "doctor"
        };

        // Insert the object into the collection
        collection.insertOne(user, (err, result) => {
            if (err) return (err);

            return (result);
        });
    });
}


const insertPatient = (versicherungsnummer, firstname, lastname, password, roomNR, doctor) => {
    // Connect to the MongoDB server
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
        if (err) return (err);

        // Select the "users" collection from the database
        const collection = client.db("E-Akte").collection("users");

        // Generate the password hash and salt
        const {hash, salt} = genPassword(password);

        // Create the object to be inserted
        const user = {
            username: "pat_" + firstname + "_" + versicherungsnummer.substring(0,2),
            versicherungsnummer: versicherungsnummer,
            firstname: firstname,
            lastname: lastname,
            fullname: firstname + " " + lastname,
            hash: hash,
            salt: salt,
            roomNR: roomNR,
            doctor: doctor,
            type: "patient"
        };

        // Insert the object into the collection
        collection.insertOne(user, (err, result) => {
            if (err) return (err);

            // Return the result of the insertion
            return (result);
        });
    });
}

module.exports.insertAdmin = insertAdmin;
module.exports.insertDoctor = insertDoctor;
module.exports.insertPatient = insertPatient;