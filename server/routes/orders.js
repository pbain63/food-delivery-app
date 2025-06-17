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
// PATCH /api/orders/:id/place - Provider marks order as placed
router.patch("/:id/place", authenticate, async (req, res) => {
  const orderId = req.params.id;

  if (req.user.role !== "provider") {
    return res.status(403).json({ error: "Only providers can update orders." });
  }

  try {
    // Check if order exists and is "pending"
    const existing = await pool.query("SELECT * FROM orders WHERE id = $1", [
      orderId,
    ]);
    const order = existing.rows[0];

    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }

    if (order.status !== "pending") {
      return res
        .status(400)
        .json({ error: "Only pending orders can be marked as placed." });
    }

    // Update status to "placed"
    const result = await pool.query(
      "UPDATE orders SET status = 'placed' WHERE id = $1 RETURNING *",
      [orderId]
    );

    res.json({ order: result.rows[0] });
  } catch (err) {
    console.error("Failed to update order:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
