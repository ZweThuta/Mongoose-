const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

//render page
router.get("/register", authController.getRegisterPage);
router.post("/register", authController.registerAccount)

router.get("/login", authController.getLoginPage);

router.post("/login", authController.postLoginData);
router.post("/logout", authController.logout);

module.exports = router; 
