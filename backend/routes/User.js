const express = require("express");
const router = express.Router();

const { signUp, login, sendOTP } = require("../controllers/Auth")

// const {auth} = require("../middlewares/auth");


//ROUTE FOR LOGIN
router.post("/login", login)

// Route for user signup
router.post("/signup", signUp)

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

module.exports = router;