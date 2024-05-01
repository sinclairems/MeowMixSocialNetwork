const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database 
const mongodbURI = "mongodb://localhost:27017/meowmixDB";
mongoose
  .connect(mongodbURI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Load Models
const User = require("./models/User");
const Thought = require("./models/Thought");

// API routes
app.use("/api/users", require("./routes/api/userRoutes"));
app.use("/api/thoughts", require("./routes/api/thoughtRoutes"));

// Start Server
app.listen(port, () => console.log(`Server listening on port ${port}`));
