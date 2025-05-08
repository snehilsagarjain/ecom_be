const express = require('express')
const ordercontroller = require('../Controller/order_controller');
const { userAuth } = require('../middleware/userAuth');
const router = express.Router();
router.post('/createorder', userAuth, ordercontroller.createorder);

// router.get('/getorder', ordercontroller.getorder);
// router.get('/getAllorders', ordercontroller.getAllorders); //userAuth,
router.get('/getordersByUserId', userAuth, ordercontroller.getordersByUserId);
router.get('/getProductsFromordersByUserId', userAuth, ordercontroller.getProductsFromordersByUserId);
// router.get('/getActiveProductBySupplierId', userAuth, productcontroller.getActiveProductBySupplierId);
// router.get('/getInActiveProductBySupplierId', userAuth, productcontroller.getInActiveProductBySupplierId);

router.put('/editorder/:id', userAuth, ordercontroller.updateorder);
// router.patch('/softdelete/:id', userAuth, ordercontroller.softdelete);
router.delete('/deleteorder/:id', userAuth, ordercontroller.deleteorder);
module.exports = router;