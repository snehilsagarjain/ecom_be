// const asyncHandler = require('express-async-handler');
// const Cart = require('../models/cartModel.js');
// const Product = require('../models/productModel.js');
const wishlistModel = require('../models/wishlistModel.js')

// // @desc    Add item to cart
// // @route   POST /api/cart
// // @access  Private
// const addToCart = asyncHandler(async (req, res) => {
//     const { productId, quantity } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) {
//         res.status(404);
//         throw new Error("Product not found");
//     }

//     const cart = await Cart.findOne({ user: req.user._id });

//     if (cart) {
//         const itemExists = cart.items.find((item) => item.product.toString() === productId);
//         if (itemExists) { itemExists.quantity += quantity; }
//         else { cart.items.push({ product: productId, quantity }); }
//         await cart.save();
//         // res.json(cart);
//     } else {
//         const newCart = new Cart({ user: req.user._id, items: [{ product: productId, quantity }], });
//         await newCart.save();
//         // res.status(201).json(newCart);
//     }

//     res.status(201).json({ message: "Item added to cart" });
// });

// // @desc    Remove item from cart
// // @route   DELETE /api/cart/:itemId
// // @access  Private

// // Remove Item from Cart
// const removeFromCart = asyncHandler(async (req, res) => {
//     const { productId } = req.body;

//     const cart = await Cart.findOne({ user: req.user._id });
//     if (!cart) { res.status(404); throw new Error("Cart not found"); }

//     // cart.items = cart.items.filter((item) => item.product.toString() !== productId);
//     const itemIndex = cart.items.findIndex((item) => item._id.toString() === req.params.itemId);
//     if (itemIndex === -1) { res.status(404); throw new Error("Item not found in cart"); }
//     cart.items.splice(itemIndex, 1);

//     // if (cart) {
//     //     cart.items = cart.items.filter((item) => item.product.toString() !== productId);
//     await cart.save();
//     res.json(cart);
//     res.status(200).json({ message: "Item removed from cart" });
//     // } else { res.status(404); throw new Error('Cart not found'); }
// });

const productModel = require("../models/productModel");

exports.createWishlist = async (req, res) => {
    if (req.body) {
        const wishlist = wishlistModel(req.body);
        if (wishlist) { await wishlist.save(); res.status(200).json({ message: "product added in wishlist successfully" }); }
    }
}

exports.getProductIdsFromWishListsByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getProductIdsFromWishListsByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const carts = await cartModel.find({ userId: _id }); //, Status: status
    // const carts = await cartModel.find({ userId: _id }).populate("productId").exec();
    // const carts = await cartModel.find({ userId: _id }).populate("productId", "_id").exec();
    // const carts = await cartModel.find({}, 'productId');
    const wishlists = await wishlistModel.find({ userId: _id }, 'productId').lean();

    const productIds = wishlists.map(wishlist => wishlist.productId);
    // console.log(`>>>>>>>>>28>>>carts>>>>>>>.`, carts);
    console.log(`>>>>>>>>>28>>>productIds>>>>>>>.`, productIds);
    // if (carts) { 
    if (productIds) {
        // res.status(200).json(carts); 
        res.status(200).json(productIds);
    }
    else res.status(404).json({ message: "wishlists not found" });
}

exports.getProductsFromWishListsByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getProductsFromWishListsByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const carts = await cartModel.find({ userId: _id }); //, Status: status
    const wishlists = await wishlistModel.find({ userId: _id }).populate("productId").exec();
    console.log(`>>>>>>>>>28>>>wishlists>>>>>>>.`, wishlists);
    if (wishlists) { console.log(`>>>>>>>>>`, wishlists); res.status(200).json(wishlists); }
    else res.status(404).json({ message: "carts not found" });
}

// exports.getAllWishlists = async (req, res) => {
//     console.log(`>>>>>>>>>11`);

//     const wishlists = await wishlistModel.find();
//     console.log(`>>>>>>>>>28>>>>>getAllWishlists>>>>>.`, wishlists);
//     console.log("===========================================");

//     if (wishlists) { res.status(200).json(wishlists); }
//     else res.status(404).json({ message: "wishlists not found" });
// }

// exports.getWishlist = async (req, res) => {
//     const wishlists = await wishlistModel.findById(req.params.id);
//     res.status(200).json(wishlists);
// }

exports.getWishlistsByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    const wishlists = await wishlistModel.find({ userId: _id }); //, Status: status
    console.log(`>>>>>>>>>28>>>wishlists>>>>>>>.`, wishlists);
    if (wishlists) { res.status(200).json(wishlists); }
    else res.status(404).json({ message: "wishlists not found" });
}

// exports.getActiveProductBySupplierId = async (req, res) => {
//     const { supplierId } = req.drdr;
//     console.log(supplierId);
//     if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
//     // const products = await productModel.find({ supplierId });
//     const products = await productModel.find({ supplierId: supplierId, Status: "active" });
//     console.log(products);
//     if (products) { res.status(200).json(products); }
//     else res.status(404).json({ message: "products not found" });
// }

// exports.getInActiveProductBySupplierId = async (req, res) => {
//     const { supplierId } = req.drdr;
//     console.log(supplierId);
//     if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
//     // const products = await productModel.find({ supplierId });
//     const products = await productModel.find({ supplierId: supplierId, Status: "inactive" });
//     console.log(products);
//     if (products) { res.status(200).json(products); }
//     else res.status(404).json({ message: "products not found" });
// }

exports.updateWishlist = async (req, res) => {
    const wishlist = await wishlistModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json(wishlist);
}

// exports.softdelete = async (req, res) => {
//     const { id } = req.params;
//     const { Status } = req.body;

//     // const { id, status } = req.query;
//     console.log(id)
//     console.log(Status);
//     if (!id) return res.status(400).json({ message: "Access Denied." });
//     const products = await productModel.findByIdAndUpdate(id, { Status: Status }, { new: true });
//     console.log(products); //{ _id: id }, { $set:  }
//     res.status(200).json(products);
// }

exports.deleteWishlist = async (req, res) => { //RemoveByCartId
    // console.log(`>>>>>>>>36>>>>>>>>`, req.params.id);
    const { _id } = req.user;
    console.log(`>>>>>>>>_id:>>>>>>`, _id);

    const { id } = req.params;
    console.log(id);
    console.log(req.params.id);

    // const cart = await cartModel.findByIdAndDelete({ _id: req.params.id });
    const wishlist = await wishlistModel.findOneAndDelete({ userId: _id, productId: id });
    console.log(wishlist);
    res.status(200).json(wishlist);
}

