// server/routes/orders.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticate = require("../middleware/authenticate");

// Existing routes...

// GET /api/orders/placed - for delivery users
router.get("/placed", authenticate, async (req, res) => {
  if (req.user.role !== "delivery") {
    return res.status(403).json({ error: "Access denied" });
  }

  try {
    const result = await pool.query(
      `SELECT orders.*, meals.title AS meal_title, users.name AS customer_name
       FROM orders
       JOIN meals ON orders.meal_id = meals.id
       JOIN users ON orders.customer_id = users.id
       WHERE status = 'placed'
       ORDER BY created_at DESC`
    );

    res.json({ orders: result.rows });
  } catch (err) {
    console.error("Error fetching placed orders:", err);
    res.status(500).json({ error: "Failed to fetch placed orders" });
  }
});

module.exports = router;
