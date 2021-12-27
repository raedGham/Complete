const express = require('express');

const router = express.Router();

// middleware

const { authCheck, adminCheck } = require("../middlewares/auth")

// controller
const { create, listAll, remove, read, update, list, productsCount, productStar, listRelated,searchFilters } = require('../controllers/product');

// Routes


router.post("/product", authCheck, adminCheck, create);                  // route to create a Product
router.get('/products/total', productsCount);                             // used to return number of products
router.get("/products/:count", listAll);          // route get list of products as per specified count
router.delete("/product/:slug", authCheck, adminCheck, remove);          // route to Delete a Product
router.get("/product/:slug", read);                                      // get a specific product
router.put("/product/:slug", authCheck, adminCheck, update);             // route to Update a Product
router.post('/products', list);                                          // used for home page products

// rating route
router.put("/product/star/:productid", authCheck, productStar);

//related
router.get("/product/related/:productId", listRelated);

//Search
router.post("/search/filters", searchFilters );
module.exports = router;