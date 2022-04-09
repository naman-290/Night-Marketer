const express = require("express");
const router = express.Router();
const controller = require("../controllers/user_controller");


router.post("/register",controller.signup);
router.post("/login",controller.login);
router.post("/forgotPassword",controller.forgotPassword);
router.get("/getUser",controller.getUser);


module.exports = router;