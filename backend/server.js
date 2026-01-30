const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Debug (remove later if you want)
console.log("MONGO_URI =", process.env.MONGO_URI);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB error:", err.message);
  });

// Routes
app.use("/api/auth", require("./routes/auth"));

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Server start
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted" });
});
