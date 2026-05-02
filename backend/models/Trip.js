const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: Number,
      required: true,
      min: 1,
    },
    budget: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    startDate: {
      type: String,
    },
    travelers: {
      type: String,
      default: "Couple",
    },
    activities: {
      type: [String],
      default: [],
    },
    itinerary: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", tripSchema);