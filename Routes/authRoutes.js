const express = require('express')
const { verifyTokenAPI } = require("../middleware/userAuth");
const router = express.Router();
router.get("/verifyToken", verifyTokenAPI); // Ensure this exists!
module.exports = router;