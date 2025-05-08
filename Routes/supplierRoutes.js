const express = require('express');
const { createSupplier } = require('../Controller/supplier_controller');
const router = express.Router();
router.post('/createSupplier', createSupplier);
module.exports = router;
