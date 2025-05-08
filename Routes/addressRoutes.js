const express = require('express')
const addresscontroller = require('../Controller/address_controller');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router();
router.post('/createAddress', userAuth, addresscontroller.createAddress);

// router.get('/getAllProducts', addresscontroller.getAllProducts); //userAuth,

router.get('/getAddressesByUserId', userAuth, addresscontroller.getAddressesByUserId);
// router.get('/getActiveProductBySupplierId', userAuth, productcontroller.getActiveProductBySupplierId);
// router.get('/getInActiveProductBySupplierId', userAuth, productcontroller.getInActiveProductBySupplierId);

// router.get('/getProduct', productcontroller.getProduct);

// router.put('/editAddress/:id', userAuth, addresscontroller.updateAddress);

// router.patch('/softdelete/:id', userAuth, productcontroller.softdelete);
router.delete('/deleteProduct/:id', userAuth, addresscontroller.deleteAddress);
module.exports = router;