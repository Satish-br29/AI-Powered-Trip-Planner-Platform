const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const { generateTrip, getMyTrips } = require("../controllers/tripController");

// POST /api/trip/generate  (protected)
router.post("/generate", authMiddleware, generateTrip);

// GET /api/trip/my-trips  (protected)
router.get("/my-trips", authMiddleware, getMyTrips);

module.exports = router;