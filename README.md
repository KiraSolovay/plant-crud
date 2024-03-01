# MERN CRUD Plant Tracker App
This is a MERN (MongoDB, Express.js, React.js, Node.js) CRUD application with user authentication.

## Description
This full-stack application provides a way for houseplant owners to keep track of their plants.

## Technologies Used
MongoDB: Database to store application data.
Express.js: Web application framework for Node.js.
React.js: Frontend library for building user interfaces.
Node.js: JavaScript runtime environment..
JWT (JSON Web Tokens): Used for authentication.
Axios: Promise-based HTTP client for making requests.
Bootstrap: Frontend framework for styling.
Create-React-App: This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation

### Clone the repository:
git clone https://github.com/KiraSolovay/plant-crud.git

### Navigate to the project directory:
cd your-mern-crud-app

### Install dependencies:
npm install

### Set up MongoDB:
Make sure MongoDB is installed and running on your system.
Create a .env file in the root directory and add your MongoDB connection string:
MONGODB_URI=your_mongodb_connection_string

### Start the development server:
npm start

Open your browser and navigate to http://localhost:3000 to view the application.

## Usage
Register a new user account.
Log in with your credentials.
Perform CRUD operations on plants.
Access protected routes that require authentication.

## Folder Structure
client: Contains the frontend React application.
server: Contains the backend Node.js and Express.js application.
models: Defines MongoDB schemas for data models.
controllers: Defines API routes for CRUD operations and authentication.
config: Contains configuration files

## Contributing
Contributions are welcome! Feel free to submit pull requests or open issues.
