const express = require('express')
const productcontroller = require('../Controller/product_controller');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router();
router.post('/createProduct', userAuth, productcontroller.createProduct);

router.get('/getAllProducts', productcontroller.getAllProducts); //userAuth,
router.get('/getProductsBySupplierId/:status', userAuth, productcontroller.getProductsBySupplierId);
// router.get('/getActiveProductBySupplierId', userAuth, productcontroller.getActiveProductBySupplierId);
// router.get('/getInActiveProductBySupplierId', userAuth, productcontroller.getInActiveProductBySupplierId);

router.get('/getProduct', productcontroller.getProduct);

router.put('/editProduct/:id', userAuth, productcontroller.updateProduct);
router.patch('/editProductQuantity/:id', userAuth, productcontroller.updateProductQuantity);

router.patch('/softdelete/:id', userAuth, productcontroller.softdelete);
router.delete('/deleteProduct/:id', userAuth, productcontroller.deleteProduct);
module.exports = router;