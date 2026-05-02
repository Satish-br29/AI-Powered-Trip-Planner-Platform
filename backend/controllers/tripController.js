const Trip = require("../models/Trip");
const generateItinerary = require("../utils/itineraryGenerator");

// POST /api/trip/generate  (protected)
const generateTrip = async (req, res) => {
  try {
    const { destination, days, budget, startDate, travelers, activities } = req.body;

    if (!destination || !days || !budget) {
      return res
        .status(400)
        .json({ message: "destination, days, and budget are required." });
    }

    if (Number(days) < 1 || Number(days) > 30) {
      return res
        .status(400)
        .json({ message: "Days must be between 1 and 30." });
    }

    if (!["low", "medium", "high"].includes(budget)) {
      return res
        .status(400)
        .json({ message: "Budget must be low, medium, or high." });
    }

    // Generate itinerary using local smart engine (no API key needed)
    const itineraryText = await generateItinerary(
      destination,
      Number(days),
      budget,
      startDate,
      travelers,
      activities
    );

    // Save trip to MongoDB
    const trip = new Trip({
      userId: req.user.id,
      destination: destination.trim(),
      days: Number(days),
      budget,
      startDate,
      travelers,
      activities,
      itinerary: itineraryText,
    });
    await trip.save();

    res.json({
      success: true,
      trip: {
        id: trip._id,
        destination: trip.destination,
        days: trip.days,
        budget: trip.budget,
        startDate: trip.startDate,
        travelers: trip.travelers,
        activities: trip.activities,
        itinerary: trip.itinerary,
        createdAt: trip.createdAt,
      },
    });
  } catch (err) {
    console.error("Trip generation error:", err.message);
    res.status(500).json({ message: "Failed to generate trip. Please try again." });
  }
};

// GET /api/trip/my-trips  (protected)
const getMyTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ trips });
  } catch (err) {
    console.error("Fetch trips error:", err.message);
    res.status(500).json({ message: "Failed to fetch trips." });
  }
};

module.exports = { generateTrip, getMyTrips };
