const mongoose = require("mongoose");

const lawyerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
  },
  practiceAreas: [String],
  education: [
    {
      degree: String,
      institution: String,
      year: Number,
    },
  ],
  barAssociationNumber: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviews: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: Number,
      comment: String,
      date: { type: Date, default: Date.now },
    },
  ],
  availability: {
    days: [String],
    hours: String,
  },
  consultationFee: { type: Number, required: true },
  status: { type: String, default: "active" },
  profileImage: String,
});

module.exports = mongoose.model("Lawyer", lawyerSchema);
