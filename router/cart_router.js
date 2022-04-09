const express = require("express");
const router = express.Router();
const controller = require("../controllers/cart_controller");

router.post("/add",controller.add);
router.get("/getCart",controller.getCart)
router.post("/emptyCart",controller.emptyCart)
router.post("/removeFromCart",controller.removeFromCart);

module.exports = router