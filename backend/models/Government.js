const mongoose = require("mongoose");

const GovSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, default: "admin" },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Government", GovSchema);
