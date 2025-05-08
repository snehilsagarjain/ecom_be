const inventoryModel = require("../models/inventoryModel");
const productModel = require("../models/productModel");

exports.createInventory = async (req, res) => {
    if (req.body) {
        const product = productModel(req.body);
        if (product) {
            const session = await mongoose.startSession();
            session.startTransaction();
            try {
                const newproduct = await product.save({ session }); res.status(200).json({ message: "product created successfully" });
                //supplierId, Quantity, _id
                const productId = newproduct._id;
                const quantity = newproduct.Quantity;
                const supplierId = newproduct.supplierId;
                const Inventory = inventoryModel({ productId, quantity, supplierId });
                const newInventory = await Inventory.save({ session }); res.status(200).json({ message: "product created in Inventory successfully" });
                await session.commitTransaction();
            }
            catch (error) { await session.abortTransaction(); console.error("Transaction aborted:", error.message); }
            finally { session.endSession(); }
        }
    }
}

exports.getAllProducts = async (req, res) => {
    // console.log(`>>>>>>>>>11`);

    const products = await inventoryModel.find({}).populate('productId');
    console.log(`>>>>>>>>>28>>>products>>>>>>>.`, products);
    console.log("===========================================");

    if (products) { res.status(200).json(products); }
    else res.status(404).json({ message: "products not found" });
}

exports.getProductById = async (req, res) => {
    // console.log(`>>>>>>>>>11`);

    const products = await inventoryModel.findById(req.params.id).populate('productId');
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
    console.log(`>>>>>>status>>>>>`, typeof (status));
    status === true ? console.log(`44`, status) : console.log(`44(1)`, status);
    status === false ? console.log(`45`, status) : console.log(`45(1)`, status);

    status == true ? console.log(`47`, status) : console.log(`47(1)`, status);
    status == false ? console.log(`48`, status) : console.log(`48(1)`, status);

    status === "true" ? console.log(`44`, status) : console.log(`44(1)`, status);
    status === "false" ? console.log(`45`, status) : console.log(`45(1)`, status);

    status == "true" ? console.log(`47`, status) : console.log(`47(1)`, status);
    status == "false" ? console.log(`48`, status) : console.log(`48(1)`, status);

    // const status = req.body;
    const { supplierId } = req.user;
    console.log(status);
    if (!supplierId) { res.status(400).json({ message: "Access Denied." }); }
    // const products = await productModel.find({ supplierId });
    // const products = await productModel.find({ supplierId: supplierId, Status: status });
    // const products =
    //     await inventoryModel
    //         .find({ supplierId })
    //         .populate({ path: 'productId', match: { status: 'true' } });
    // }
    // console.log(`>>>>>>>>>28>>>>getProductsBySupplierId>>>>>>.`, products);

    // const users = await User.find().populate('orders');
    // const products = await inventoryModel.find({ supplierId }).populate('productId');
    // console.log(`>>>>>>>>>28>>>>getProductsBySupplierId>>>>>>.`, products);
    // const filteredProducts = products.map(product => {
    //     product.productId = product.productId.filter(proId => proId.status === 'true');
    //     return product;
    // });

    const products = await inventoryModel.find({ supplierId }).populate('productId');
    console.log(`>>>>>>>>>79>>>>getProductsBySupplierId>>>>>>.`, products);
    const filteredProducts = products.filter(product => {
        // return product.productId && product.productId.Status === Boolean(status);
        // console.log(`>>>>>>status82>>>>>`, typeof (product.productId.Status));
        return product.productId && product.productId.Status == JSON.parse(status);
    });

    // console.log(`filteredProducts:`, filteredProducts);


    if (filteredProducts) { res.status(200).json(filteredProducts); }
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

exports.updateInventory = async (req, res) => {
    console.log(`101paramsId:`, req.params.id);

    console.log(`req.body:`, req.body);

    const products = await inventoryModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    console.log(`updateInventoryProduct:`, products);

    // { quantity: Quantity }
    res.status(200).json(products);
}

// exports.updateInventoryQuantity = async (req, res) => {
//     console.log(`req.body:`, req.body);
//     const { quantity } = req.body;
//     console.log(`quantity:`, quantity);
//     console.log("ID received:", req.params.id);

//     const inventory = await inventoryModel.find({ productId: req.params.id });
//     console.log(`inventory:`, inventory);

//     // const { _id } = inventory;
//     const result = inventory.quantity - Number(quantity);
//     const invent = await inventoryModel.findByIdAndUpdate(inventory._id, { quantity: result }, { new: true });
//     // const inventory = await inventoryModel.findOneAndUpdate({ productId: req.params.id }, { quantity: quantity }, { new: true });

//     // const productId = inventory.productId;
//     // const products = await productModel.findByIdAndUpdate(productId, { Quantity: quantity }, { new: true });

//     // console.log(`products:`, products);
//     res.status(200).json(inventory);
//     // res.status(200).json(products);
// }

exports.updateInventoryQuantity = async (req, res) => {
    try {
        console.log(`req.body:`, req.body);
        const { quantity } = req.body;
        const { id } = req.params;

        if (!quantity || isNaN(quantity)) {
            return res.status(400).json({ message: "Invalid quantity provided" });
        }

        // Find the inventory by productId
        const inventory = await inventoryModel.findOne({ productId: id });

        if (!inventory) {
            return res.status(404).json({ message: "Inventory not found for the given productId" });
        }

        const updatedQuantity = inventory.quantity - Number(quantity);
        if (updatedQuantity < 0) {
            return res.status(400).json({ message: "Quantity cannot go below zero" });
        }

        // Update the quantity
        const updatedInventory = await inventoryModel.findByIdAndUpdate(
            inventory._id,
            { quantity: updatedQuantity },
            { new: true }
        );
        console.log(`updatedInventory:`, updatedInventory);

        res.status(200).json(updatedInventory);
    } catch (error) {
        console.error("Error updating inventory quantity:", error);
        res.status(500).json({ message: "Server error" });
    }
};


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

// exports.deleteProduct = async (req, res) => {
//     console.log(`>>>>>>>>36>>>>>>>>`, req.params.id);
//     const products = await productModel.findByIdAndDelete({ _id: req.params.id });
//     console.log(products);
//     res.status(200).json(products);
// }

