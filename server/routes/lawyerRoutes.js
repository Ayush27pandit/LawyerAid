const express = require("express");
const { protect, verifyRole } = reuire("../middleware/authMiddleware");
const { addLawyerProfike } = require("../controllers/lawyerController");

router.post("/lawyer-profile", protect, verifyRole("lawyer"), addLawyerProfike);

module.exports = router;
