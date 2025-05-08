const express = require('express');
const router = express.Router();
const { createUser, forgetPassword, createMail } = require('../Controller/user_controller')
router.post('/createUser', createUser);
router.patch('/forgotpassword', forgetPassword);
router.post('/createMail', createMail);
module.exports = router;