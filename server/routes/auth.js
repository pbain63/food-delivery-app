// server/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../db");
require("dotenv").config();

const router = express.Router();

// Register route
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, hashedPassword, role]
    );

    const token = jwt.sign(
      { id: result.rows[0].id, role },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "User registration failed" });
  }
});

module.exports = router;
