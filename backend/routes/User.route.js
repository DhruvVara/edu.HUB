const express = require("express");
const router = express.Router();

const { signUp, login, sendOTP } = require("../controllers/Auth.controller");
const { validateSchema } = require("../common/validation");
const { signInSchema, signUpSchema } = require("../validation/authValidation");

// const {auth} = require("../middlewares/auth");

//ROUTE FOR LOGIN
router.post("/login", validateSchema(signInSchema), login);

// Route for user signup
router.post("/signup", validateSchema(signUpSchema), signUp);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP);

module.exports = router;
