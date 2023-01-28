// Mongoose is a Object Data Modeling (ODM) library for 
// MongoDB distributed as an npm package.
const mongoose = require("mongoose");

// configures and gives access to .env file object
require('dotenv').config();

const { MONGODB_URI } = process.env


mongoose.connect(MONGODB_URI)
    .then( () => {
        console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`);
    })
    .catch( (error) => {
        console.log('MongoDB connection error 😥', error)
})