// const asyncHandler = require('express-async-handler');
// const Cart = require('../models/cartModel.js');
// const Product = require('../models/productModel.js');
const { default: mongoose } = require('mongoose');
const cartModel = require('../models/cartModel.js')

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
const inventoryModel = require('../models/inventoryModel.js');

exports.createCart = async (req, res) => {
    console.log(`req.body:`, req.body);
    if (req.body) {
        const cart = cartModel(req.body);
        if (cart) { await cart.save(); res.status(200).json({ message: "product added in cart successfully" }); }
        else { console.log(`Adding Product to cart failed`); }
    }
}

exports.getProductIdsFromPendingCartsByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getProductsFromCartsByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const carts = await cartModel.find({ userId: _id }); //, Status: status
    // const carts = await cartModel.find({ userId: _id }).populate("productId").exec();
    // const carts = await cartModel.find({ userId: _id }).populate("productId", "_id").exec();
    // const carts = await cartModel.find({}, 'productId');

    const carts = await cartModel.find({ userId: _id, status: 'pending' }, 'productId').lean();
    console.log(`>>>>>>>>>>>carts>>>>>>>`, carts);

    const productIds = carts.map(cart => cart.productId);
    // console.log(`>>>>>>>>>28>>>carts>>>>>>>.`, carts);
    console.log(`>>>>>>>>>28>>>productIds>>>>>>>.`, productIds);
    // if (carts) { 
    if (productIds) {
        // res.status(200).json(carts); 
        res.status(200).json(productIds);
    }
    else res.status(404).json({ message: "carts not found" });
}

exports.getProductsFromPendingCartsByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getCartsByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const carts = await cartModel.find({ userId: _id }); //, Status: status
    const carts = await cartModel.find({ userId: _id, status: 'pending' }).populate("productId").exec();
    console.log(`>>>>>>>>>28>>>carts>>>>>>>.`, carts);
    if (carts) { console.log(`>>>>>>>>>`, carts); res.status(200).json(carts); }
    else res.status(404).json({ message: "carts not found" });
}

exports.getCartsByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getCartsByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const carts = await cartModel.find({ userId: _id }); //, Status: status
    const carts = await cartModel.find({ userId: _id }).populate("productId").exec();
    console.log(`>>>>>>>>>28>>>carts>>>>>>>.`, carts);
    if (carts) { res.status(200).json(carts); }
    else res.status(404).json({ message: "carts not found" });
}

exports.getCartProduct = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getCartsByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const carts = await cartModel.find({ userId: _id }); //, Status: status
    const carts = await cartModel.findById({ _id: req.params.cartId }).populate("productId").exec();
    console.log(`>>>>>>>>>28>>>carts>>>>>>>.`, carts);
    if (carts) { res.status(200).json(carts); }
    else res.status(404).json({ message: "carts not found" });
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

exports.updateCart = async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const { quantity, status } = req.body;
        let obj;
        if (quantity) {
            console.log(`>>>>>>quantity>>>>>>>`, quantity);
            if (quantity !== undefined && quantity < 1) { return res.status(400).json({ message: "Quantity must be at least 1" }); }

            const cart = await cartModel.findById(req.params.id);
            if (!cart) { return res.status(404).json({ message: "Inventory not found for the given productId" }); }
            const { productId } = cart;

            const inventory = await inventoryModel.findOne({ productId: productId }); // Find the inventory by productId
            if (!inventory) { return res.status(404).json({ message: "Inventory not found for the given productId" }); }
            const quant = inventory.quantity;             // const { quantity } = inventory;

            if (quantity > quant) { return res.status(404).json({ message: "Cannot add more than inventory" }); }

            obj = { quantity: quantity };
        }
        else if (status) { obj = { status: status }; }

        const cartItem = await cartModel.findByIdAndUpdate(
            req.params.id,
            // { $set: { quantity } },
            { $set: obj },
            { new: true, runValidators: true } // Returns updated document
        );
        if (!cartItem) { return res.status(404).json({ message: "Cart item not found" }); }
        res.json({ message: "Cart updated", cartItem });
        await session.commitTransaction();
    }
    catch (error) { await session.abortTransaction(); console.error("Transaction aborted:", error.message); res.status(500).json({ message: "Server error", error }); }
    finally { session.endSession(); }
}

// exports.updateCart = async (req, res) => {
//     try {
//         const { quantity } = req.body; console.log(`>>>>>>quantity>>>>>>>`, quantity);
//         if (quantity !== undefined && quantity < 1) { return res.status(400).json({ message: "Quantity must be at least 1" }); }

//         const cartItem = await cartModel.findByIdAndUpdate(
//             req.params.id,
//             // { $set: { quantity } },
//             { $set: obj },
//             { new: true, runValidators: true } // Returns updated document
//         );
//         if (!cartItem) { return res.status(404).json({ message: "Cart item not found" }); }
//         res.json({ message: "Cart updated", cartItem });
//     } catch (error) { res.status(500).json({ message: "Server error", error }); }
// }
// exports.updateCartStatus = async (req, res) => {
//     try {
//         const { status } = req.body;

//         const cartItem = await cartModel.findByIdAndUpdate(
//             req.params.id,
//             { $set: obj },
//             // { $set: { status } },
//             // { $set: { status: 'complete' } },
//             { new: true, runValidators: true } // Returns updated document
//         );
//         if (!cartItem) { return res.status(404).json({ message: "Cart item not found" }); }
//         res.json({ message: "Cart updated", cartItem });
//     } catch (error) { res.status(500).json({ message: "Server error", error }); }
// }

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

exports.deleteCart = async (req, res) => { //RemoveByCartId
    const { _id } = req.user; console.log(`>>>>>>>_id>>>>>>`, _id);
    const { id } = req.params; console.log(`>>>>>>>>36>>>>>>>>`, id);

    // const cart = await cartModel.findByIdAndDelete({ _id: req.params.id });
    // const cart = await cartModel.findOneAndDelete({ userId: _id, productId: id }); console.log(`>>>>>>>242 cart>>>>`, cart);
    const cart = await cartModel.findByIdAndDelete({ _id: id }); console.log(`>>>>>>>242 cart>>>>`, cart);
    res.status(200).json(cart);
}

