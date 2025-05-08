const mongoose = require('mongoose');
const supplierOrders = mongoose.Schema({
    supplierId: { type: mongoose.Schema.Types.ObjectId, ref: "supplier", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "order", required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: "address", required: true },
    paymentMode: { type: String },
    quantity: { type: Number },
    status: { type: String, default: 'Initial' }
}, { timestamps: true })
module.exports = mongoose.model("supplierOrder", supplierOrders)


// const result = await supplierOrderModel.find({}, 'quantity').populate("productId", "price").exec();
