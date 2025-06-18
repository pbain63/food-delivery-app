// server/routes/orders.js
const express = require("express");
const router = express.Router();
const pool = require("../db");
const authenticate = require("../middleware/authenticate");

// POST /api/orders - customer places an order
router.post("/", authenticate, async (req, res) => {
  const { meal_id, quantity } = req.body;
  const customerId = req.user.id;

  if (req.user.role !== "customer") {
    return res.status(403).json({ error: "Only customers can place orders." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO orders (customer_id, meal_id, quantity) VALUES ($1, $2, $3) RETURNING *",
      [customerId, meal_id, quantity || 1]
    );

    res.status(201).json({ order: result.rows[0] });
  } catch (err) {
    console.error("Failed to place order:", err);
    res.status(500).json({ error: "Failed to place order" });
  }
});
// GET /api/orders/placed - Delivery sees all placed orders
router.get("/placed", authenticate, async (req, res) => {
  if (req.user.role !== "delivery") {
    return res
      .status(403)
      .json({ error: "Only delivery personnel can view placed orders." });
  }

  try {
    const result = await pool.query(
      `SELECT orders.*, users.name AS customer_name, meals.title AS meal_title 
       FROM orders 
       JOIN users ON orders.customer_id = users.id 
       JOIN meals ON orders.meal_id = meals.id 
       WHERE orders.status = 'placed'
       ORDER BY orders.created_at DESC`
    );

    res.json({ orders: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch placed orders." });
  }
});

// PATCH /api/orders/:id/deliver - Delivery marks an order as delivered
router.patch("/:id/deliver", authenticate, async (req, res) => {
  if (req.user.role !== "delivery") {
    return res
      .status(403)
      .json({ error: "Only delivery personnel can update delivery status." });
  }

  const orderId = req.params.id;

  try {
    const result = await pool.query(
      `UPDATE orders
       SET status = 'delivered'
       WHERE id = $1 AND status = 'placed'
       RETURNING *`,
      [orderId]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ error: "Order not found or already delivered." });
    }

    res.json({ message: "Order marked as delivered", order: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update order status." });
  }
});

module.exports = router;
