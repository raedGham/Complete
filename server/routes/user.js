const express = require('express');

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

// controller
const { userCart } = require('../controllers/user');

router.post("/cart", authCheck, userCart)

//route
// router.get("/user", (req, res) => {
//     res.json({
//         data: "You hit user route",
//     });
// });

module.exports = router;
