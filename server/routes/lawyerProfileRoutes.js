const express = require("express");
const router = express.Router();
const { protect, verifyRole } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const {
  createLawyerProfile,
} = require("../controllers/lawyerProfileController");

// POST: Create a lawyer profile with an optional profile picture
router.post(
  "/",
  protect, // Authenticate user
  verifyRole("lawyer"), // Ensure user is a lawyer
  upload.single("profilePic"), // Middleware to handle file upload
  createLawyerProfile // Controller function
);

module.exports = router;
