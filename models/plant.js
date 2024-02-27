const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema({
    name: String,
    species: String,
    sunlight: String,
    water: String
})

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;