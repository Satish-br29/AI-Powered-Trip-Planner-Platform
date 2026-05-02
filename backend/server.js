require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const tripRoutes = require("./routes/trip");

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/trip", tripRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "AI Trip Planner API is running!" });
});

// Proxy route to bypass strict adblockers and CORS for external images universally
app.get("/api/proxy-image", async (req, res) => {
  try {
    const targetUrl = req.query.url;
    if (!targetUrl) return res.status(400).send("Missing url parameter");
    
    // Node 18+ has native fetch. Let's use it directly.
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.startsWith("image/")) {
      // Fallback if not an image, but Wikipedia sometimes returns weird types
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    res.set("Content-Type", contentType || "image/jpeg");
    res.set("Cache-Control", "public, max-age=604800"); // Cache for 7 days
    res.send(buffer);
  } catch (error) {
    console.error("Proxy error for URL:", req.query.url, "Error:", error.message);
    res.status(500).send("Error proxying image");
  }
});

// MongoDB connect + server start
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/tripDB";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected to tripDB");
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });