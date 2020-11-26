const express = require("express");

const { signup, getBill } = require("../controller/appController.js");

const router = express.Router();

// /api/user/signup
router.post("/user/signup", signup);

// /api/product/get-the-bill
router.post("/product/get-the-bill", getBill);

module.exports = router;