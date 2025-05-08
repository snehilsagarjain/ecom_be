const mongoose = require('mongoose');
const orderSchema = mongoose.Schema({
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "cart", required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    paymentMode: { type: String },
    deliveryDate: { type: Date },
    status: { type: String, default: 'placed' }
}, { timestamps: true })
module.exports = mongoose.model("order", orderSchema)