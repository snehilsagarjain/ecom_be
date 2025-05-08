const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "supplier",
    },
    Name: { type: String, required: true, },
    Size: { type: String, required: true },
    Color: { type: String },
    Status: { type: Boolean, default: true },
    // , required: true
    Price: { type: Number },
    Quantity: { type: Number },
    BrandName: { type: String, required: true },
    Remarks: { type: String },
    Image: {}
}, { timestamps: true });
module.exports = mongoose.model('product', productSchema);