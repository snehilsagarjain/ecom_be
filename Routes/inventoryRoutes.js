const express = require('express')
const inventorycontroller = require('../Controller/inventory_controller');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router();
router.post('/createInventory', userAuth, inventorycontroller.createInventory);
router.get('/getProductsBySupplierId/:status', userAuth, inventorycontroller.getProductsBySupplierId);


router.get('/getAllProducts', inventorycontroller.getAllProducts); //userAuth,
// GET /inventory/getProductById/:id
router.get('/getProductById/:id', userAuth, inventorycontroller.getProductById);
// router.get('/getCart', inventorycontroller.getCart);
// // router.get('/getAllCarts', inventorycontroller.getAllCarts); //userAuth,
// router.get('/getCartsByUserId', userAuth, inventorycontroller.getCartsByUserId);
// router.get('/getCartProduct/:cartId', userAuth, inventorycontroller.getCartProduct);
// router.get('/getProductsFromPendingCartsByUserId', userAuth, inventorycontroller.getProductsFromPendingCartsByUserId);
// router.get('/getProductIdsFromPendingCartsByUserId', userAuth, inventorycontroller.getProductIdsFromPendingCartsByUserId);
// // router.get('/getActiveProductBySupplierId', userAuth, productcontroller.getActiveProductBySupplierId);
// // router.get('/getInActiveProductBySupplierId', userAuth, productcontroller.getInActiveProductBySupplierId);

router.patch('/editInventory/:id', userAuth, inventorycontroller.updateInventoryQuantity);
router.put('/editInventoryStatus/:id', userAuth, inventorycontroller.updateInventory); //updateCartStatus
// // router.patch('/softdelete/:id', userAuth, inventorycontroller.softdelete);
// router.delete('/deleteCart/:id', userAuth, inventorycontroller.deleteCart);


module.exports = router;