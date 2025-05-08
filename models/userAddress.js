const mongoose = require('mongoose');
const AddressSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "user", required: true
    },
    name: {
        type: String, required: true
    },
    phone: {
        type: String, required: true
    },
    alternatePhone: {
        type: String, required: true
    },
    postalCode: {
        type: String, required: true
    },
    address: {
        type: String, required: true
    },
    apartment: {
        type: String, required: true
    },
    landmark: {
        type: String, required: true
    },
    city: {
        type: String, required: true
    },
    state: {
        type: String, required: true
    },
    country: {
        type: String, required: true
    },
}, { timestamps: true })
module.exports = mongoose.model('address', AddressSchema);