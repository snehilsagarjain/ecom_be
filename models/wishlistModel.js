const mongoose = require('mongoose');
const wishlistSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "product",
    }
}, { timestamps: true })
module.exports = mongoose.model('wishlists', wishlistSchema);