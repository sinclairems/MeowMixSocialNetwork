const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 5000; // Or choose a different port if you prefer

// Middleware
app.use(cors());
app.use(express.json()); // Parse incoming JSON data

// MongoDB Connection String (replace with your own)
const mongodbURI = "mongodb://localhost:27017/meowmixDB";

// Connect to MongoDB
mongoose
  .connect(mongodbURI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Basic route (for testing)
app.get("/", (req, res) => {
  res.send("MeowMix Backend is Running!");
});

// Start server
app.listen(port, () => console.log(`Server listening on port ${port}`));
