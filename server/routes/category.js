const express = require('express');

const router = express.Router();

// middleware

const { authCheck, adminCheck } = require("../middlewares/auth")

// controller
const { create, read, update, remove, list } = require('../controllers/category');

// Routes
router.post("/category", authCheck, adminCheck, create);          // route to create a category
router.get("/categories", list);                                  // public route to get a list of all categories
router.get("/category/:slug", read);       // route to read a single category
router.put("/category/:slug", authCheck, adminCheck, update);     // route to update a category
router.delete("/category/:slug", authCheck, adminCheck, remove);  // route to delete a category


module.exports = router;