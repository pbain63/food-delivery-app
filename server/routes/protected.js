const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/auth");

// Example protected route
router.get("/protected", authenticate, (req, res) => {
  res.json({
    message: "You have accessed a protected route!",
    user: req.user, // this will show id and role
  });
});

module.exports = router;
