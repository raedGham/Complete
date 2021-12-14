const express = require('express');

const router = express.Router();

// middleware

const { authCheck, adminCheck } = require("../middlewares/auth")

// controller
const { create } = require('../controllers/product');

// Routes
router.post("/product", authCheck, adminCheck, create);          // route to create a category


module.exports = router;