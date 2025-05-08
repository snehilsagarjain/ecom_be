const mongoose = require('mongoose');
const cartSchema = mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    quantity: { type: Number },
    status: { type: String, default: 'pending' }
}, { timestamps: true })
module.exports = mongoose.model('cart', cartSchema);