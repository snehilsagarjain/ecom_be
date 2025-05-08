const express = require('express')
const supplierOrdercontroller = require('../Controller/supplierOrder_controller');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router();
router.post('/createorder', userAuth, supplierOrdercontroller.createorder);

// router.get('/getorder', supplierOrdercontroller.getorder);
// router.get('/getAllorders', supplierOrdercontroller.getAllorders); //userAuth,
router.get('/getordersByUserId', userAuth, supplierOrdercontroller.getOrdersByUserId);
router.get('/getProductsFromordersByUserId', userAuth, supplierOrdercontroller.getProductsFromOrdersByUserId);
// router.get('/getActiveProductBySupplierId', userAuth, productcontroller.getActiveProductBySupplierId);
// router.get('/getInActiveProductBySupplierId', userAuth, productcontroller.getInActiveProductBySupplierId);

router.patch('/editorder/:id', userAuth, supplierOrdercontroller.updateOrder);
// router.patch('/softdelete/:id', userAuth, supplierOrdercontroller.softdelete);
router.delete('/deleteorder/:id', userAuth, supplierOrdercontroller.deleteOrder);
module.exports = router;