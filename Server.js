const express = require("express"); // Importing Express.js framework
const axios = require("axios"); // Importing Axios for making HTTP requests
const cors = require("cors"); // Importing CORS middleware for enabling Cross-Origin Resource Sharing
const mongoose = require("mongoose"); // Importing Mongoose for MongoDB interactions
const bcrypt = require("bcryptjs"); // Importing bcrypt for password hashing
const jwt = require("jsonwebtoken"); // Importing JSON Web Token for user authentication

const app = express(); // Creating an Express application
const PORT = process.env.PORT || 3001; // Defining the port number
app.use(cors()); // Using CORS middleware to enable Cross-Origin Resource Sharing
app.use(express.json()); // Parsing incoming JSON requests

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://SachinAkash01:wvHYdk4g9OwjUTsw@iservesl-db.7oh0h24.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define User schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  functions: {
    type: [String],
    default: [], // Default value as an empty array
  },
});

// Define User model
const User = mongoose.model("User", userSchema);
