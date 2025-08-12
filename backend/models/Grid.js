const mongoose = require("mongoose");

const GridSchema = new mongoose.Schema({
  region: { type: String, enum: ["north","south","east","west"], required: true },
  source: { type: String },
  carbonIntensity: { type: Number, required: true },
  unit: { type: String, default: "gCO2/kWh" },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Grid", GridSchema);
