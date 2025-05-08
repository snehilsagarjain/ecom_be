// const supplierModel = require("../models/supplierModel");
const supplierModel = require("../models/supplierModel");

exports.createSupplier = async (req, res) => {
    // console.log(`>>>>>>>>5>>>>>>>>`, req.body);
    const supplirModel = supplierModel(req.body);
    const result = await supplirModel.save();
    // console.log(`>>>>>>>8>>>>>>>`, result);
    // console.log(`>>>>>>>9>>>>>>>`, result._id);
    res.status(200).json(result._id);
}