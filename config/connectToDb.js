// Load .env variables
if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

// import dependencies
const mongoose = require("mongoose");

// access mongo uri from env file
const mongoURI = process.env.MONGO_URI;

async function connectToDb() {
    try{
        await mongoose.connect(mongoURI);
        console.log("connected to database");
    } catch (err) {
        console.log(err);
    }

}

module.exports = connectToDb;