// Load .env variables
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// Import Dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require('./config/connectToDb');
const plantsController = require(`./controllers/plantsController`)

// Create Express App
const app = express();

// Connect to Database
connectToDb();

// Configure Express App
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Routing
app.get("/", (req, res) => {
    res.send("Express is here");
});

app.post("/create", plantsController.createPlant);

app.get("/plants", plantsController.fetchPlants);

app.get("/plants/:id", plantsController.fetchOnePlant);

app.delete("/delete/:id", plantsController.deletePlant);

app.put("/update/:id", plantsController.updatePlant);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
