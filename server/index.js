// Required dependencies
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:enuThUQ0PpaCKswG@cluster0.n7gwjes.mongodb.net/lawproj"
    );
    console.log("DB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

connectDB();

// User Schema (for clients)
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "client" },
  createdAt: { type: Date, default: Date.now },
});

// Lawyer Schema
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
  practiceAreas: [{ type: String }],
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

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lawyerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: "pending" },
  caseDescription: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
const Lawyer = mongoose.model("Lawyer", lawyerSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);

// Authentication Middleware
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

// User Routes
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if all required fields are present
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "client", // Make role optional, default to client
    });

    await user.save();

    // Create JWT token
    const token = jwt.sign({ _id: user._id }, "your-secret-key"); // Replace with process.env.JWT_SECRET

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(400).json({
      error: "Registration failed",
      details: error.message,
    });
  }
});

app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Unable to login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Unable to login");
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Invalid login credentials" });
  }
});

// Lawyer Routes
app.post("/api/lawyers", auth, async (req, res) => {
  try {
    const lawyer = new Lawyer({
      ...req.body,
      userId: req.user._id,
    });
    await lawyer.save();
    res.status(201).send(lawyer);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/lawyers", async (req, res) => {
  try {
    const filters = {};

    if (req.query.specialization) {
      filters.specialization = req.query.specialization;
    }

    if (req.query.location) {
      filters["location.city"] = req.query.location;
    }

    const lawyers = await Lawyer.find(filters);
    res.send(lawyers);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/api/lawyers/:id", async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    if (!lawyer) {
      return res.status(404).send();
    }
    res.send(lawyer);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Appointment Routes
app.post("/api/appointments", auth, async (req, res) => {
  try {
    const appointment = new Appointment({
      ...req.body,
      clientId: req.user._id,
    });
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/api/appointments", auth, async (req, res) => {
  try {
    let appointments;
    if (req.user.role === "client") {
      appointments = await Appointment.find({
        clientId: req.user._id,
      }).populate("lawyerId");
    } else {
      const lawyer = await Lawyer.findOne({ userId: req.user._id });
      appointments = await Appointment.find({ lawyerId: lawyer._id }).populate(
        "clientId"
      );
    }
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Review Routes
app.post("/api/lawyers/:id/reviews", auth, async (req, res) => {
  try {
    const lawyer = await Lawyer.findById(req.params.id);
    lawyer.reviews.push({
      userId: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    // Update average rating
    const totalRating = lawyer.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    lawyer.rating = totalRating / lawyer.reviews.length;

    await lawyer.save();
    res.status(201).send(lawyer);
  } catch (error) {
    res.status(400).send(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
