const Plant = require('../models/plant');

const createPlant = async (req, res) => {
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
}

const fetchPlants = (req, res) => {
    Plant.find()
        .then((plants) => res.json(plants))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Failed to fetch plants" });
        });
}

const fetchOnePlant = async (req, res) => {
    await Plant.findById(req.params.id).then((onePlant) => {
        if (!onePlant) {
            return res.status(404).json({ error : "Plant not found" });
        }
        else{
            res.json(onePlant);
        }
    }).catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Unable to find plant" });
    });
}

const deletePlant = (req, res) => {
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
};

const updatePlant = (req, res) => {
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
}

module.exports = {
    createPlant: createPlant,
    fetchPlants: fetchPlants,
    fetchOnePlant: fetchOnePlant,
    deletePlant: deletePlant,
    updatePlant: updatePlant
}