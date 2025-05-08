const addressModel = require("../models/userAddress");
// import addressModel from "../models/addressModel.js";

exports.createAddress = async (req, res) => {
    if (req.body) {
        const address = addressModel(req.body);
        if (address) { await address.save(); res.status(200).json({ message: "product created successfully" }); }
        else { res.status(400).json({ message: "no address" }) }
    }
    else { res.status(400).json({ message: "no req.body" }) }
}

// exports.getAllAddresses = async (req, res) => {
//     const addresses = await addressModel.find({ userId: _id });
//     console.log(`>>>>>>>>>28>>>>>getAllAddresses>>>>>.`, addresses);
//     if (addresses) { res.status(200).json(addresses); }
//     else res.status(404).json({ message: "products not found" });
// }

// exports.getAddress = async (req, res) => {
//     const address = await addressModel.findById(req.params.id);
//     res.status(200).json(address);
// }

exports.getAddressesByUserId = async (req, res) => {
    const { _id } = req.user;
    if (!_id) { res.status(400).json({ message: "UserID not received. Login Required!!!" }); }
    // const products = await productModel.find({ supplierId });
    // const addresses = await addressModel.find({ userId: _id });
    // console.log(`>>>>>>>>>28>>>>getAddressesByUserId>>>>>>.`, addresses);
    // if (addresses) { res.status(200).json(addresses); }
    // else res.status(404).json({ message: "products not found" });

    try {
        const addresses = await addressModel.find({ userId: _id });
        console.log(addresses);
        if (addresses) { res.status(200).json(addresses); }
        else res.status(404).json({ message: "products not found" });
    } catch (error) {
        console.error("Error fetching addresses:", error);
    }

}

exports.updateProduct = async (req, res) => {
    const products = await productModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json(products);
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

exports.deleteAddress = async (req, res) => {
    console.log(`>>>>>>>>36>>>>>>>>`, req.params.id);
    const products = await productModel.findByIdAndDelete({ _id: req.params.id });
    console.log(products);
    res.status(200).json(products);
}

