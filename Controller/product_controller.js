const mongoose = require("mongoose");
const inventoryModel = require("../models/inventoryModel");
const productModel = require("../models/productModel");

// exports.createProduct = async (req, res) => {
//     if (req.body) {
//         const product = productModel(req.body);
//         if (product) {
//             const session = await mongoose.startSession();
//             session.startTransaction();
//             try {
//                 const newproduct = await product.save({ session }); res.status(200).json({ message: "product created successfully" });
//                 //supplierId, Quantity, _id
//                 const productId = newproduct._id;
//                 const quantity = newproduct.Quantity;
//                 const supplierId = newproduct.supplierId;
//                 const Inventory = inventoryModel({ productId, quantity, supplierId });
//                 const newInventory = await Inventory.save({ session }); res.status(200).json({ message: "product created in Inventory successfully" });
//                 await session.commitTransaction();
//             }
//             catch (error) { await session.abortTransaction(); console.error("Transaction aborted:", error.message); }
//             finally { session.endSession(); }
//         }
//     }
// }

exports.createProduct = async (req, res) => {
    if (req.body) {
        const product = productModel(req.body);
        if (product) {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                const newproduct = await product.save(); //res.status(200).json({ message: "product created successfully" });
                //supplierId, Quantity, _id
                const productId = newproduct._id; console.log(`productId:`, productId);

                const quantity = newproduct.Quantity; console.log(`quantity:`, quantity);

                const supplierId = newproduct.supplierId; console.log(`supplierId:`, supplierId);

                const Inventory = inventoryModel({ productId, quantity, supplierId });
                const newInventory = await Inventory.save(); res.status(200).json({ message: "product created successfully" });
                await session.commitTransaction();
            }
            catch (error) { await session.abortTransaction(); console.error("Transaction aborted:", error.message); }
            finally { session.endSession(); }
        }
    }
}

exports.getAllProducts = async (req, res) => {
    // console.log(`>>>>>>>>>11`);

    const products = await productModel.find({ Status: true });
    console.log(`>>>>>>>>>28>>>products>>>>>>>.`, products);
    console.log("===========================================");

    if (products) { res.status(200).json(products); }
    else res.status(404).json({ message: "products not found" });
}

exports.getProduct = async (req, res) => {
    const products = await productModel.findById(req.params.id);
    res.status(200).json(products);
}

exports.getProductsBySupplierId = async (req, res) => {
    const { status } = req.params;
    // const status = req.body;
    const { supplierId } = req.user;
    console.log(status);
    if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    const products = await productModel.find({ supplierId: supplierId, Status: status });
    console.log(`>>>>>>>>>28>>>>getProductsBySupplierId>>>>>>.`, products);
    if (products) { res.status(200).json(products); }
    else res.status(404).json({ message: "products not found" });
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

exports.updateProduct = async (req, res) => {
    console.log(`req.body:`, req.body);
    const products = await productModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json(products);
}
exports.updateProductQuantity = async (req, res) => {
    console.log(`req.body:`, req.body);
    const { quantity } = req.body;
    console.log(`quantity:`, quantity);
    console.log("ID received:", req.params.id);
    const inventory = await inventoryModel.findByIdAndUpdate({ _id: req.params.id }, { quantity: quantity }, { new: true });
    const productId = inventory.productId;
    const products = await productModel.findByIdAndUpdate(productId, { Quantity: quantity }, { new: true });

    console.log(`products:`, products);

    res.status(200).json(products);
}
exports.softdelete = async (req, res) => {
    const { id } = req.params;
    const { Status } = req.body;

    // const { id, status } = req.query;
    console.log(id)
    console.log(Status);
    if (!id) return res.status(400).json({ message: "Access Denied." });
    const products = await productModel.findByIdAndUpdate(id, { Status: Status }, { new: true });
    console.log(`>>>>>>130products:`, products); //{ _id: id }, { $set:  }
    res.status(200).json(products);
}

exports.deleteProduct = async (req, res) => {
    console.log(`>>>>>>>>36>>>>>>>>`, req.params.id);
    const products = await productModel.findByIdAndDelete({ _id: req.params.id });
    const inventory_products = await inventoryModel.findOneAndDelete({ productId: req.params.id });
    console.log(products);
    console.log(inventory_products);
    res.status(200).json(products);
}

