const express = require("express");
const router = express.Router();

const { signUp, login, sendOTP, changePassword } = require("../controllers/Auth.controller");
const { validateSchema } = require("../common/validation");
const { signInSchema, signUpSchema } = require("../validation/authValidation");

// const {auth} = require("../middlewares/auth");

//ROUTE FOR LOGIN
router.post("/login", validateSchema(signInSchema), login);

// Route for user signup
router.post("/signup", validateSchema(signUpSchema), signUp);

// Route for sending OTP to the user's email
router.post("/sendotp", sendOTP);

// Route for Changing the password
router.post("/changepassword", auth, changePassword);

// Route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken);

// Route for resetting user's password after verification
router.post("/reset-password", resetPassword);

module.exports = router;
