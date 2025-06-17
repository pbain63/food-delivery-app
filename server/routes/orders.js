// server/routes/orders.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticate = require("../middleware/authenticate");

// POST /api/orders
router.post("/", authenticate, async (req, res) => {
  const { meal_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    const result = await pool.query(
      "INSERT INTO orders (customer_id, meal_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [user_id, meal_id, quantity]
    );
    res.status(201).json({ order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ✅ NEW: GET /api/orders - View orders for current user
router.get("/", authenticate, async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  try {
    if (role === "customer") {
      // Customer: see all their own orders
      const result = await pool.query(
        `SELECT o.id, o.quantity, o.created_at, m.title, m.description, m.price, m.type
         FROM orders o
         JOIN meals m ON o.meal_id = m.id
         WHERE o.customer_id = $1
         ORDER BY o.created_at DESC`,
        [userId]
      );
      return res.json({ orders: result.rows });
    } else if (role === "provider") {
      // Provider: see orders placed on their meals
      const result = await pool.query(
        `SELECT o.id, o.quantity, o.created_at, m.title, u.name AS customer_name
         FROM orders o
         JOIN meals m ON o.meal_id = m.id
         JOIN users u ON o.customer_id = u.id
         WHERE m.provider_id = $1
         ORDER BY o.created_at DESC`,
        [userId]
      );
      return res.json({ orders: result.rows });
    } else {
      return res.status(403).json({ error: "Unauthorized role" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
