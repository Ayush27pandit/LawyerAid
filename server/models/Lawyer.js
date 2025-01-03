const exp = require("constants");
const mongoose = require("mongoose");

const LawyerSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  location: { type: String, required: true },
  experience: { type: Number, required: true },
  rating: { type: Number, required: true },
});

module.exports = mongoose.model("Lawyer", LawyerSchema);
