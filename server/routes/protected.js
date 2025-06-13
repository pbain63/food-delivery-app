// server/routes/protected.js
const express = require("express");
const { authenticateToken, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

// Open route (any authenticated user)
router.get("/profile", authenticateToken, (req, res) => {
  res.json({ message: "Your profile:", user: req.user });
});

// Provider-only route
router.post(
  "/create-meal",
  authenticateToken,
  authorizeRoles("provider"),
  (req, res) => {
    res.json({ message: "Meal created by provider!" });
  }
);

module.exports = router;
