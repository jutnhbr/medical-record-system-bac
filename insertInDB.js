// Import the MongoDB library
const {genPassword} = require("./lib/passwordUtils");
const MongoClient = require('mongodb').MongoClient;

// Define the function that inserts an object into a MongoDB collection
const insertAdmin = (username, name, password, callback) => {
    // Connect to the MongoDB server
    MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, (err, client) => {
        if (err) return callback(err);

        // Select the "users" collection from the database
        const collection = client.db("Medical-Record-System-Database").collection("users");

        // Generate the password hash and salt
        const { hash, salt } = genPassword(password);

        // Create the object to be inserted
        const user = {
            username: username,
            name: name,
            hash: hash,
            salt: salt,
            type: "admin"
        };

        // Insert the object into the collection
        collection.insertOne(user, (err, result) => {
            if (err) return callback(err);

            // Return the result of the insertion
            return callback(null, result);
        });
    });
}

const insertDoctor = (username, name, password, patients, callback) => {
    // Connect to the MongoDB server
    MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
        if (err) return callback(err);

        // Select the "users" collection from the database
        const collection = client.db("Medical-Record-System-Database").collection("users");

        // Generate the password hash and salt
        const {hash, salt} = genPassword(password);

        // Create the object to be inserted
        const user = {
            username: username,
            name: name,
            hash: hash,
            salt: salt,
            patients: patients,
            type: "doctor"
        };

        // Insert the object into the collection
        collection.insertOne(user, (err, result) => {
            if (err) return callback(err);

            // Return the result of the insertion
            return callback(null, result);
        });
    });
}


    const insertPatient = (username, versicherungsnummer, name, password, roomNR, doctor, callback) => {
        // Connect to the MongoDB server
        MongoClient.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err, client) => {
            if (err) return callback(err);

            // Select the "users" collection from the database
            const collection = client.db("Medical-Record-System-Database").collection("users");

            // Generate the password hash and salt
            const {hash, salt} = genPassword(password);

            // Create the object to be inserted
            const user = {
                username: username,
                versicherungsnummer: versicherungsnummer,
                name: name,
                hash: hash,
                salt: salt,
                roomNR: roomNR,
                doctor: doctor,
                type: "patient"
            };

            // Insert the object into the collection
            collection.insertOne(user, (err, result) => {
                if (err) return callback(err);

                // Return the result of the insertion
                return callback(null, result);
            });
        });
    }
