const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Report low stock items
router.get('/low-stock', async (req, res) => {
    try {
        const lowStockThreshold = 5;
        const lowStockProducts = await Product.find({ inventory: { $lte: lowStockThreshold } });
        res.json(lowStockProducts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;