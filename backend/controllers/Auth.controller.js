const User = require("../models/User.js");
const OTPmodel = require("../models/OTPmodel.js");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/ProfileSchema.js");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { jsonResponse } = require("../common/jsonResponse.js");
const { message } = require("../common/messages.js");

dotenv.config({ path: "./.env" });

// SendOTP
exports.sendOTP = async (req, res) => {
  let status = false;

  try {
    const { email } = req.body;

    const CheckUserPresent = await User.findOne({ email });

    if (CheckUserPresent) {
      return jsonResponse(res, 500, status, message.user.emailExist);
    }

    // generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // console.log("otp:", otp);

    let result = await OTPmodel.findOne({ otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTPmodel.findOne({ otp });
    }

    const otpPayload = { email, otp };

    // create entry

    const otpBody = await OTPmodel.create(otpPayload);
    console.log("otp: ", otp);

    status = true;
    return jsonResponse(res, 200, status, message.user.otpSent);
  } catch (err) {
    console.log(err.message, "error occured to generate otp");
    // return res.status(400).json({
    //     success: false,
    //     message: "Email is already registered"
    // })
    return jsonResponse(res, 500, status, message.common.serverError);
  }
};

exports.signUp = async (req, res) => {
  let status = false;

  try {
    // console.log(req.body);
    const {
      firstName,
      lastName,
      contactNumber,
      accountType,
      email,
      password,
      otp,
    } = req.body;

    const CheckUserExist = await User.findOne({ email });
    if (CheckUserExist) {
      return jsonResponse(res, 500, status, message.user.emailExist);
    }

    const recentopt = await OTPmodel.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (recentopt.length == 0) {
      return jsonResponse(res, 400, status, message.otp.notFound);
    }

    if (otp != recentopt[0].otp) {
      return jsonResponse(res, 400, status, message.otp.invalidOtp);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      contactNumber,
      additionalDetails: profileDetails,
      accountType,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    const deleteOtp = await OTPmodel.findByIdAndDelete(recentopt[0]._id);
    status = true;

    return jsonResponse(res, 200, status, message.user.signUpSuccessfull);
  } catch (err) {
    console.log(err.message, "error occurred in signup");
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      err.message
    );
    // return res.status(400).json({
    //     success: false,
    //     message: "User not registered"
    // })
  }
};

exports.login = async (req, res) => {
  let status = false;

  try {
    const { email, password } = req.body;

    // Check User
    const user = await User.findOne({ email });
    if (!user) {
      return jsonResponse(res, 400, status, message.user.emailNotExist);
    }

    // Verify Password
    const verifyPassword = await bcrypt.compare(password, user.password);

    // console.log(verifyPassword)
    if (!verifyPassword) {
      return jsonResponse(res, 400, status, message.user.invalidCredentials);
    }

    // Generate jwt token
    const payload = {
      email: user.email,
      id: user._id,
      accountType: user.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    user.token = token;
    user.password = undefined;

    // create cookie
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    status = true;

    // console.log("Successfully login")
    return res.cookie("token", token, options).status(200).json({
      success: true,
      message: "Login Successfully",
      token,
      user,
    });
  } catch (err) {
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      err.message
    );
  }
};

// Change Password
exports.changePassword = async (req, res) => {
  let status = false;
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id);

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return jsonResponse(res, 401, status, message.user.incorrectPassword);
      // return res
      //     .status(401)
      //     .json({ success: false, message: "The password is incorrect" });
    }

    // Match new password and confirm new password
    if (newPassword !== confirmNewPassword) {
      // If new password and confirm new password do not match, return a 400 (Bad Request) error
      // return res.status(400).json({
      //     success: false,
      //     message: "The password and confirm password does not match",
      // });
      // return json
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      );
      console.log("Email sent successfully:", emailResponse.response);
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending ema  il",
        error: error.message,
      });
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    });
  }
};
