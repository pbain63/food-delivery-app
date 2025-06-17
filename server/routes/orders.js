const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticate = require("../middleware/authenticate");

// POST /api/orders - Customer places an order
router.post("/", authenticate, async (req, res) => {
  const { meal_id, quantity } = req.body;
  const customerId = req.user.id;

  if (req.user.role !== "customer") {
    return res.status(403).json({ error: "Only customers can place orders." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO orders (customer_id, meal_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [customerId, meal_id, quantity]
    );
    res.status(201).json({ order: result.rows[0] });
  } catch (err) {
    console.error("Order error:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

module.exports = router;
