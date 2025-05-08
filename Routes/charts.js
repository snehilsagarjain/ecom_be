const express = require('express');
const router = express.Router();
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const SupplierOrder = require('../models/supplierOrdersModel');

// Monthly Sales Chart (Line Chart)
router.get('/charts/monthly-sales', async (req, res) => {
    try {
        const result = await Cart.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $group: {
                    _id: { $month: '$createdAt' },
                    total: { $sum: { $multiply: ['$quantity', '$product.Price'] } }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const chartData = months.map((m, i) => {
            const match = result.find(r => r._id === i + 1);
            return { name: m, sales: match ? match.total : 0 };
        });

        res.json(chartData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Weekly Cost & Profit Chart (Bar Chart)
router.get('/charts/weekly-cost-profit', async (req, res) => {
    try {
        const result = await SupplierOrder.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: '$product' },
            {
                $group: {
                    _id: { $dayOfWeek: '$createdAt' },
                    cost: { $sum: { $multiply: ['$quantity', '$product.Price'] } }
                }
            },
            {
                $addFields: {
                    profit: { $multiply: ['$cost', 1.3] }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const chartData = days.map((d, i) => {
            const match = result.find(r => r._id === i + 1);
            return {
                name: d,
                cost: match ? match.cost : 0,
                profit: match ? match.profit : 0
            };
        });

        res.json(chartData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
