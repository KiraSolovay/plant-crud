const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
const mongoURI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose.connect(mongoURI).catch((err) => console.log(err));

//DB SCHEMA AND MODEL
const postSchema =mongoose.Schema({
    title: String,
    description: String
})

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    res.send("Express is here")
})

app.post("/create", (req, res) => {
    Post.create({
        title: req.body.title,
        description: req.body.description
    })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
})

app.listen(3001, function() {
    console.log("Server is running")
})