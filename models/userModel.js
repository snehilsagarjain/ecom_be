const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    supplierId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supplier",
    },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: 'user' },
    otp: { type: String },
    expirytime: { type: Date }
}, { timestamps: true });
module.exports = mongoose.model('users', userSchema);

