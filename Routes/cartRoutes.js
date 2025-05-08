const express = require('express')
const cartcontroller = require('../Controller/cart_controller');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router();
router.post('/createCart', userAuth, cartcontroller.createCart);

// router.get('/getCart', cartcontroller.getCart);
// router.get('/getAllCarts', cartcontroller.getAllCarts); //userAuth,
router.get('/getCartsByUserId', userAuth, cartcontroller.getCartsByUserId);
router.get('/getCartProduct/:cartId', userAuth, cartcontroller.getCartProduct);
router.get('/getProductsFromPendingCartsByUserId', userAuth, cartcontroller.getProductsFromPendingCartsByUserId);
router.get('/getProductIdsFromPendingCartsByUserId', userAuth, cartcontroller.getProductIdsFromPendingCartsByUserId);
// router.get('/getActiveProductBySupplierId', userAuth, productcontroller.getActiveProductBySupplierId);
// router.get('/getInActiveProductBySupplierId', userAuth, productcontroller.getInActiveProductBySupplierId);

router.put('/editCart/:id', userAuth, cartcontroller.updateCart);
router.put('/editCartStatus/:id', userAuth, cartcontroller.updateCart); //updateCartStatus
// router.patch('/softdelete/:id', userAuth, cartcontroller.softdelete);
router.delete('/deleteCart/:id', userAuth, cartcontroller.deleteCart);
module.exports = router;