const express = require('express');

const router = express.Router();

// middleware

const { authCheck, adminCheck } = require("../middlewares/auth")

// controller
const { create, read } = require('../controllers/product');

// Routes


router.post("/product", authCheck, adminCheck, create);          // route to create a Product
router.get("/products", read);          // route get list of products

module.exports = router;