const mongoose = require('mongoose');
const InventorySchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'product'
        },
        quantity: {
            type: Number,
            required: true
        },
        supplierId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'supplier'
        }
    }, { timestamps: true }
);
module.exports = mongoose.model('Inventory', InventorySchema);