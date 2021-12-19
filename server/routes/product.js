const express = require('express');

const router = express.Router();

// middleware

const { authCheck, adminCheck } = require("../middlewares/auth")

// controller
const { create, listAll, remove, read, update } = require('../controllers/product');

// Routes


router.post("/product", authCheck, adminCheck, create);                  // route to create a Product
router.get("/products/:count", listAll);          // route get list of products as per specified count
router.delete("/product/:slug", authCheck, adminCheck, remove);          // route to Delete a Product
router.get("/product/:slug", read);                                      // get a specific product
router.put("/product/:slug", authCheck, adminCheck, update);          // route to Update a Product
module.exports = router;