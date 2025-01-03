const mongoose = require("mongoose");

const LawyerProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  contact: { type: String, required: true },
  profile: { type: String, required: true },
});

module.exports = mongoose.model("LawyerProfile", LawyerProfileSchema);
