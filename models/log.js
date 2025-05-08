const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    action: String, // CREATE_PRODUCT, LOGIN, LOGOUT, etc.
    description: String,
    route: String,
    method: String,
    status: String, // success/fail
    ip: String,
    createdAt: { type: Date, default: Date.now, index: true }, // index for fast queries
});

module.exports = mongoose.model('Log', logSchema);
