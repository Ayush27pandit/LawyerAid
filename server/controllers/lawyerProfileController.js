const LawyerProfile = require("../models/LawyerProfile");

const createLawyerProfile = async (req, res) => {
  const { specialization, experience, contact } = req.body;

  try {
    const profilePic = req.file ? `/uploads/${req.file.filename}` : null;

    const lawyerProfile = new LawyerProfile({
      user: req.user._id,
      specialization,
      experience,
      contact,
      profilePic,
    });

    await lawyerProfile.save();
    res.status(201).json(lawyerProfile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createLawyerProfile };
