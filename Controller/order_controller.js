// const asyncHandler = require('express-async-handler');
// const order = require('../models/orderModel.js');
// const Product = require('../models/productModel.js');
const orderModel = require('../models/orderModel.js')

// // @desc    Add item to order
// // @route   POST /api/order
// // @access  Private
// const addToorder = asyncHandler(async (req, res) => {
//     const { productId, quantity } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) {
//         res.status(404);
//         throw new Error("Product not found");
//     }

//     const order = await order.findOne({ user: req.user._id });

//     if (order) {
//         const itemExists = order.items.find((item) => item.product.toString() === productId);
//         if (itemExists) { itemExists.quantity += quantity; }
//         else { order.items.push({ product: productId, quantity }); }
//         await order.save();
//         // res.json(order);
//     } else {
//         const neworder = new order({ user: req.user._id, items: [{ product: productId, quantity }], });
//         await neworder.save();
//         // res.status(201).json(neworder);
//     }

//     res.status(201).json({ message: "Item added to order" });
// });

// // @desc    Remove item from order
// // @route   DELETE /api/order/:itemId
// // @access  Private

// // Remove Item from order
// const removeFromorder = asyncHandler(async (req, res) => {
//     const { productId } = req.body;

//     const order = await order.findOne({ user: req.user._id });
//     if (!order) { res.status(404); throw new Error("order not found"); }

//     // order.items = order.items.filter((item) => item.product.toString() !== productId);
//     const itemIndex = order.items.findIndex((item) => item._id.toString() === req.params.itemId);
//     if (itemIndex === -1) { res.status(404); throw new Error("Item not found in order"); }
//     order.items.splice(itemIndex, 1);

//     // if (order) {
//     //     order.items = order.items.filter((item) => item.product.toString() !== productId);
//     await order.save();
//     res.json(order);
//     res.status(200).json({ message: "Item removed from order" });
//     // } else { res.status(404); throw new Error('order not found'); }
// });

const productModel = require("../models/productModel");

exports.createorder = async (req, res) => {
    console.log(`req.body:`, req.body);
    if (req.body) {
        const order = orderModel(req.body);
        if (order) { const Order = await order.save(); res.status(200).json({ Order, message: "product added in order successfully" }); }
        else { console.log(`Adding Product to order failed`); }
    }
}

exports.getProductsFromordersByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getProductsFromordersByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const orders = await orderModel.find({ userId: _id }); //, Status: status
    // const orders = await orderModel.find({ userId: _id }).populate("productId").exec();
    // const orders = await orderModel.find({ userId: _id }).populate("productId", "_id").exec();
    // const orders = await orderModel.find({}, 'productId');
    const orders = await orderModel.find({ userId: _id }, 'productId').lean();

    const productIds = orders.map(order => order.productId);
    // console.log(`>>>>>>>>>28>>>orders>>>>>>>.`, orders);
    console.log(`>>>>>>>>>28>>>productIds>>>>>>>.`, productIds);
    // if (orders) { 
    if (productIds) {
        // res.status(200).json(orders); 
        res.status(200).json(productIds);
    }
    else res.status(404).json({ message: "orders not found" });
}

// exports.getAllorders = async (req, res) => {
//     console.log(`>>>>>>>>>11`);

//     const orders = await orderModel.find();
//     console.log(`>>>>>>>>>28>>>>getAllorders>>>>>>.`, orders);
//     console.log("===========================================");

//     if (orders) { res.status(200).json(orders); }
//     else res.status(404).json({ message: "products not found" });
// }

// exports.getorder = async (req, res) => {
//     const orders = await orderModel.findById(req.params.id);
//     res.status(200).json(orders);
// }

exports.getordersByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getordersByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const orders = await orderModel.find({ userId: _id }); //, Status: status
    const orders = await orderModel.find({ userId: _id }).populate("productId").exec();
    console.log(`>>>>>>>>>28>>>orders>>>>>>>.`, orders);
    if (orders) { res.status(200).json(orders); }
    else res.status(404).json({ message: "orders not found" });
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

exports.updateorder = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (quantity !== undefined && quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const orderItem = await orderModel.findByIdAndUpdate(
            req.params.id,
            { $set: { quantity } },
            { new: true, runValidators: true } // Returns updated document
        );

        if (!orderItem) {
            return res.status(404).json({ message: "order item not found" });
        }

        res.json({ message: "order updated", orderItem });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
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

exports.deleteorder = async (req, res) => { //RemoveByorderId
    const { _id } = req.user;
    const { productId } = req.params;
    console.log(`>>>>>>>>36>>>>>>>>`, productId);
    // const order = await orderModel.findByIdAndDelete({ _id: req.params.id });
    const order = await orderModel.findOneAndDelete({ userId: _id, productId: productId });
    console.log(order);
    res.status(200).json(order);
}

