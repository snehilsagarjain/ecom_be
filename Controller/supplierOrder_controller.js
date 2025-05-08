// const asyncHandler = require('express-async-handler');
// const supplierOrder = require('../models/supplierOrderModel.js');
// const Product = require('../models/productModel.js');
const supplierOrderModel = require('../models/supplierOrdersModel.js')

// // @desc    Add item to supplierOrder
// // @route   POST /api/supplierOrder
// // @access  Private
// const addTosupplierOrder = asyncHandler(async (req, res) => {
//     const { productId, quantity } = req.body;

//     const product = await Product.findById(productId);
//     if (!product) {
//         res.status(404);
//         throw new Error("Product not found");
//     }

//     const supplierOrder = await supplierOrder.findOne({ user: req.user._id });

//     if (supplierOrder) {
//         const itemExists = supplierOrder.items.find((item) => item.product.toString() === productId);
//         if (itemExists) { itemExists.quantity += quantity; }
//         else { supplierOrder.items.push({ product: productId, quantity }); }
//         await supplierOrder.save();
//         // res.json(supplierOrder);
//     } else {
//         const newsupplierOrder = new supplierOrder({ user: req.user._id, items: [{ product: productId, quantity }], });
//         await newsupplierOrder.save();
//         // res.status(201).json(newsupplierOrder);
//     }

//     res.status(201).json({ message: "Item added to supplierOrder" });
// });

// // @desc    Remove item from supplierOrder
// // @route   DELETE /api/supplierOrder/:itemId
// // @access  Private

// // Remove Item from supplierOrder
// const removeFromsupplierOrder = asyncHandler(async (req, res) => {
//     const { productId } = req.body;

//     const supplierOrder = await supplierOrder.findOne({ user: req.user._id });
//     if (!supplierOrder) { res.status(404); throw new Error("supplierOrder not found"); }

//     // supplierOrder.items = supplierOrder.items.filter((item) => item.product.toString() !== productId);
//     const itemIndex = supplierOrder.items.findIndex((item) => item._id.toString() === req.params.itemId);
//     if (itemIndex === -1) { res.status(404); throw new Error("Item not found in supplierOrder"); }
//     supplierOrder.items.splice(itemIndex, 1);

//     // if (supplierOrder) {
//     //     supplierOrder.items = supplierOrder.items.filter((item) => item.product.toString() !== productId);
//     await supplierOrder.save();
//     res.json(supplierOrder);
//     res.status(200).json({ message: "Item removed from supplierOrder" });
//     // } else { res.status(404); throw new Error('supplierOrder not found'); }
// });

const productModel = require("../models/productModel");
// const supplierOrdersModel = require('../models/supplierOrdersModel.js');

exports.createorder = async (req, res) => {
    console.log(`63req.body:`, req.body);
    if (req.body) {
        const supplierOrder = supplierOrderModel(req.body);
        if (supplierOrder) { await supplierOrder.save(); res.status(200).json({ message: "product added in supplierOrder successfully" }); }
        else { console.log(`Adding Product to supplierOrder failed`); }
    }
}

exports.getProductsFromOrdersByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    const { _id } = req.user;
    console.log(`userId  getProductsFromsupplierOrdersByUserId:`, _id);

    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const supplierOrders = await supplierOrderModel.find({ userId: _id }); //, Status: status
    // const supplierOrders = await supplierOrderModel.find({ userId: _id }).populate("productId").exec();
    // const supplierOrders = await supplierOrderModel.find({ userId: _id }).populate("productId", "_id").exec();
    // const supplierOrders = await supplierOrderModel.find({}, 'productId');
    const supplierOrders = await supplierOrderModel.find({ userId: _id }, 'productId').lean();

    const productIds = supplierOrders.map(supplierOrder => supplierOrder.productId);
    // console.log(`>>>>>>>>>28>>>supplierOrders>>>>>>>.`, supplierOrders);
    console.log(`>>>>>>>>>28>>>productIds>>>>>>>.`, productIds);
    // if (supplierOrders) { 
    if (productIds) {
        // res.status(200).json(supplierOrders); 
        res.status(200).json(productIds);
    }
    else res.status(404).json({ message: "supplierOrders not found" });
}

// exports.getAllsupplierOrders = async (req, res) => {
//     console.log(`>>>>>>>>>11`);

//     const supplierOrders = await supplierOrderModel.find();
//     console.log(`>>>>>>>>>28>>>>getAllsupplierOrders>>>>>>.`, supplierOrders);
//     console.log("===========================================");

//     if (supplierOrders) { res.status(200).json(supplierOrders); }
//     else res.status(404).json({ message: "products not found" });
// }

// exports.getsupplierOrder = async (req, res) => {
//     const supplierOrders = await supplierOrderModel.findById(req.params.id);
//     res.status(200).json(supplierOrders);
// }

exports.getOrdersByUserId = async (req, res) => {
    // const { userId } = req.params;
    // const status = req.body;
    // const { userId } = req.drdr;
    // const { _id } = req.user;
    console.log(`userId  getsupplierOrdersByUserId:`);
    // , _id
    // console.log(status);
    // if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const supplierOrders = await supplierOrderModel.find({ userId: _id }); //, Status: status
    // console.log(req.message);
    // console.log(req.user.userEmail);

    let supplierOrders;
    if (req.user.role == "user") { supplierOrders = await supplierOrderModel.find({ userId: req.user._id }).populate("productId").exec(); }
    else if (req.user.role == "supplier") { supplierOrders = await supplierOrderModel.find({ supplierId: req.user.supplierId }).populate("productId").exec(); }

    console.log(`>>>>>>>>>28>>>supplierOrders>>>>>>>.`, supplierOrders);
    if (supplierOrders) { res.status(200).json(supplierOrders); }
    else res.status(404).json({ message: "supplierOrders not found" });
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

exports.updateOrder = async (req, res) => {
    try {
        const { status } = req.body;
        const supplierOrderItem = await supplierOrderModel.findByIdAndUpdate(
            req.params.id,
            { $set: { status } },
            { new: true, runValidators: true } // Returns updated document
        );

        if (!supplierOrderItem) {
            return res.status(404).json({ message: "supplierOrder item not found" });
        }

        const { productId, quantity } = supplierOrderItem;

        if (status == "Cancelled" || status == "Return") {
            // Find the inventory by productId
            const inventory = await inventoryModel.findOne({ productId: productId });

            if (!inventory) {
                return res.status(404).json({ message: "Inventory not found for the given productId" });
            }

            const updatedQuantity = inventory.quantity + Number(quantity);
            if (updatedQuantity < 0) {
                return res.status(400).json({ message: "Quantity cannot go below zero" });
            }

            // Update the quantity
            const updatedInventory = await inventoryModel.findByIdAndUpdate(
                inventory._id,
                { quantity: updatedQuantity },
                { new: true }
            );

            res.status(200).json(updatedInventory);
        }
        // const supplierOrders = this.getOrdersByUserId();
        const supplierOrders = await getOrdersByUserId(req, res);
        console.log(`supplierOrder:`, supplierOrders);

        if (!supplierOrders.data) { res.status(404).json({ message: "supplierOrders not found" }) }
        const data = supplierOrders.data;
        res.json({ message: "supplierOrder updated", data });
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

exports.deleteOrder = async (req, res) => { //RemoveBysupplierOrderId
    const { _id } = req.user;
    const { productId } = req.params;
    console.log(`>>>>>>>>36>>>>>>>>`, productId);
    // const supplierOrder = await supplierOrderModel.findByIdAndDelete({ _id: req.params.id });
    const supplierOrder = await supplierOrderModel.findOneAndDelete({ userId: _id, productId: productId });
    console.log(supplierOrder);
    res.status(200).json(supplierOrder);
}

// const supplierOrders = require('./models/supplierOrder');

const getSupplierRevenueSummary = async () => {
    try {
        const aggregation = await supplierOrderModel.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            {
                $unwind: "$product"
            },
            {
                $addFields: {
                    totalAmount: { $multiply: ["$quantity", "$product.Price"] }
                }
            },
            {
                $group: {
                    _id: "$supplierId",
                    totalRevenue: { $sum: "$totalAmount" },
                    orders: { $push: "$$ROOT" } // All matched orders for this supplier
                }
            },
            {
                $sort: { totalRevenue: -1 }
            }
        ]);

        // Extract totalRevenue array
        const totalRevenueArray = aggregation.map(supplier => supplier.totalRevenue);

        console.log("Supplier Revenue Summary:\n", JSON.stringify(aggregation, null, 2));
        console.log("Total Revenue Array:\n", JSON.stringify(totalRevenueArray, null, 2));

        return {
            summary: aggregation,
            totalRevenues: totalRevenueArray
        };

    } catch (err) {
        console.error("Error:", err);
    }
};
