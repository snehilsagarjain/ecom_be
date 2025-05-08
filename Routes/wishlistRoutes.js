const express = require('express')
const wishlistcontroller = require('../Controller/wishlist_controller');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router();
router.post('/createWishlist', userAuth, wishlistcontroller.createWishlist);

// router.get('/getWishlist', wishlistcontroller.getWishlist);
// router.get('/getAllWishlists', wishlistcontroller.getAllWishlists); //userAuth,
router.get('/getWishlistsByUserId', userAuth, wishlistcontroller.getWishlistsByUserId);
router.get('/getProductsFromWishListsByUserId', userAuth, wishlistcontroller.getProductsFromWishListsByUserId);
router.get('/getProductIdsFromWishListsByUserId', userAuth, wishlistcontroller.getProductIdsFromWishListsByUserId);
// router.get('/getActiveProductBySupplierId', userAuth, productcontroller.getActiveProductBySupplierId);
// router.get('/getInActiveProductBySupplierId', userAuth, productcontroller.getInActiveProductBySupplierId);

router.put('/editWishlist/:id', userAuth, wishlistcontroller.updateWishlist);
// router.patch('/softdelete/:id', userAuth, wishlistcontroller.softdelete);
router.delete('/deleteWishlist/:id', userAuth, wishlistcontroller.deleteWishlist);
module.exports = router;