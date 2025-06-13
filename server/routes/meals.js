const express = require('express');
const router = express.Router();
const pool = require('../db');
const authenticate = require('../middleware/authenticate');

// POST /api/meals - Provider adds a meal
router.post('/', authenticate, async (req, res) => {
    const { title, description, price, type } = req.body;
    const providerId = req.user.id;

    if (req.user.role !== 'provider') {
        return res.status(403).json({ error: 'Only providers can add meals.' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO meals (provider_id, title, description, price, type) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [providerId, title, description, price, type]
        );

        res.status(201).json({ meal: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add meal' });
    }
});

// GET /api/meals - View all meals
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM meals ORDER BY created_at DESC');
        res.json({ meals: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch meals' });
    }
});

module.exports = router;
