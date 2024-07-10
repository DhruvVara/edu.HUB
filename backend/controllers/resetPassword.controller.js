const { jsonResponse } = require("../common/jsonResponse");
const { message } = require("../common/messages");
const User = require("../models/User");
const mailsender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// gen. pass token
exports.resetPasswordToken = async (req, res) => {
  let status = false;

  try {
    const { email } = req.body;

    // check user/email validation

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return jsonResponse(res, 400, status, message.user.emailNotExist);
    }

    // genetate token
    const token = crypto.randomUUID();

    // update user by adding token and expiration token
    const updateDetails = await User.findOneAndUpdate(
      { email },
      { token, resetPaswordToken: Date.now() + 5 * 60 * 1000 },
      { new: true }
    );

    // create Url
    const url = `http://localhost:5000/api/auth/reset-password/${token}`;

    // send mail
    // await mailsender(email,
    //     "Password Reset Link",
    //     `Password Reset Link: ${url}`);

    status = true;
    return jsonResponse(res, 200, status, message.common.emailSent);
  } catch (error) {
    // console.log(error.message, "error occurred in reset passsword");
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
};

exports.resetPassword = async (req, res) => {
  let status = false;
  try {
    const { password, token } = req.body;

    // validation
    // if (password !== confirmPassword) {
    //   return res.status(401).json({
    //     status: false,
    //     message: "Password and confirm password should be same.",
    //   });
    // }

    // fetch user details
    const userDetails = await User.findOne({ token });

    // invalid token
    if (!userDetails) {
      return jsonResponse(res, 400, status, message.user.notFound);
    }
    // token timecheck
    if (userDetails.resetPasswordExpires < Date.now()) {
      //   return res.json({
      //     status: false,
      //     message: "Token Expires",
      //   });
      return jsonResponse(res, 404, status, message.common.tokenExpired);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // update password
    const updated = await User.findOneAndUpdate(
      { token },
      { password: hashedPassword },
      { new: true }
    );

    status = true;
    return jsonResponse(res, 200, status, message.common.passwordUpdated);
  } catch (err) {
    // console.log(err.message, "reset password err");
    return jsonResponse(res, 500, status, message.common.serverError);
  }
};
