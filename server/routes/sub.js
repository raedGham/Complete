const express = require('express');

const router = express.Router();

// middleware

const { authCheck, adminCheck } = require("../middlewares/auth")

// controller
const { create, read, update, remove, list } = require('../controllers/sub');

// Routes
router.post("/sub", authCheck, adminCheck, create);          // route to create a sub category
router.get("/subs", list);                                  // public route to get a list of all sub categories
router.get("/sub/:slug", read);       // route to read a single sub category
router.put("/sub/:slug", authCheck, adminCheck, update);     // route to update a sub category
router.delete("/sub/:slug", authCheck, adminCheck, remove);  // route to delete a sub category


module.exports = router;