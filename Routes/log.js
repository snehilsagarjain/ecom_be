const express = require('express');
const router = express.Router();
const Log = require('../models/log');
const { protect, adminOnly } = require('../middleware/userAuth');

router.get('/', protect, adminOnly, async (req, res) => {
    const logs = await Log.find().sort({ createdAt: -1 }).limit(200);
    res.json(logs);
});

module.exports = router;
