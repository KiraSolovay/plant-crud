// Load .env variables
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

// Import Dependencies
const express = require("express");
const cors = require("cors");
const connectToDb = require('./config/connectToDb');
const cookieParser = require("cookie-parser");
const plantsController = require(`./controllers/plantsController`);
const usersController = require('./controllers/usersController');
const requireAuth = require('./middleware/requireAuth');

// Create Express App
const app = express();

// Connect to Database
connectToDb();

// Configure Express App
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: true,
    credentials: true
}));

// Routing
app.get("/", (req, res) => {
    res.send("Express is here");
});

app.post("/signup", usersController.signup);

app.post("/login", usersController.login);

app.get("/logout", usersController.logout);

app.get("/check-auth", requireAuth, usersController.checkAuth);

app.post("/create", requireAuth, plantsController.createPlant);

app.get("/plants", requireAuth, plantsController.fetchPlants);

app.get("/plants/:id", requireAuth, plantsController.fetchOnePlant);

app.delete("/delete/:id", requireAuth, plantsController.deletePlant);

app.put("/update/:id", requireAuth, plantsController.updatePlant);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
