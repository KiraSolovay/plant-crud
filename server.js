// Load .env variables
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// Import Dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require('./config/connectToDb');
const Plant = require('./models/plant');

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

app.post("/create", async (req, res) => {
    try {
        const plant = await Plant.create({
            name: req.body.name,
            species: req.body.species,
            sunlight: req.body.sunlight,
            water: req.body.water
        });
        res.status(201).json(plant);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create plant" });
    }
});

app.get("/plants", (req, res) => {
    Plant.find()
        .then((plants) => res.json(plants))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch plants" });
        });
});

app.delete("/delete/:id", (req, res) => {
    Plant.findByIdAndDelete(req.params.id)
        .then((plant) => {
            if (!plant) {
                return res.status(404).json({ error: "Plant not found" });
            }
            res.status(200).json({ message: "Plant deleted successfully" });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to delete plant" });
        });
});

app.put("/update/:id", (req, res) => {
    Plant.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((plant) => {
            if (!plant) {
                return res.status(404).json({ error: "Plant not found" });
            }
            res.status(200).json(plant);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to update plant" });
        });
});

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
