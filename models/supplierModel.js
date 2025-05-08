const mongoose = require('mongoose');
const supplierSchema = mongoose.Schema({
    firmname: { type: String, required: true },
    gst: { type: String, required: true },
    category: { type: String, required: true },
    payment: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('supplier', supplierSchema);
