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
  profession: String,
  contact: String,
});

// Define User model
const User = mongoose.model("users", userSchema);

// Define API endpoint for adding a new user
/**
 * Add new user.
 * @name POST/api/user
 * @function
 * @memberof module:Server
 * @inner
 * @param {string} req.body.username - Username of the new user.
 * @param {string} req.body.email - Email of the new user.
 * @param {string} req.body.password - Password of the new user.
 * @param {string} req.body.profession - Profession of the new user.
 * @param {string} req.body.contact - Contact number of the new user.
 * @returns {Object} Response object indicating success or failure of user addition.
 */
app.post("/api/user", async (req, res) => {
  try {
    const { username, email, password, profession, contact } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profession,
      contact,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Define API endpoint for retrieving all users
/**
 * Retrieve all users.
 * @name GET/api/users
 * @function
 * @memberof module:Server
 * @inner
 * @returns {Object} Response object containing array of user details.
 */
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
