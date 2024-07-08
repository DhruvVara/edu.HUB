const jwt = require("jsonwebtoken");
const user = require("../models/User");
const { jsonResponse } = require("../common/jsonResponse");
const { message } = require("../common/messages");

// auth
exports.auth = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization.replace("Bearer ", ""));
    // const token = req.cookie.token || req.body.token || req.headers("Authorization").replace("Bearer", "") || req.headers.cookie.slice(6);
    const token = req.headers.authorization;

    if (!token) {
      return jsonResponse(res, 401, false, message.common.unauthorisedAccess);
    }

    // Verify token
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid Token",
      });
    }
    // console.log("auth")

    next();
  } catch (error) {
    console.log(error.message, "auth error");
    // return res.status(401).json({
    //     success: false,
    //     message: "Server error"
    // })
    return jsonResponse(
      res,
      401,
      false,
      message.common.serverError,
      error.message
    );
  }
};

// is Student
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return jsonResponse(res, 401, false, message.common.unauthorisedAccess);
    }
  } catch (error) {
    // console.log(error.message, "isStudent err")
    return jsonResponse(
      res,
      401,
      false,
      message.common.serverError,
      error.message
    );
  }
};

// isInstructor
exports.isInstructor = async (req, res, next) => {
  try {
    // console.log("INstructor")

    if (req.user.accountType !== "Instructor") {
      return jsonResponse(res, 401, false, message.common.unauthorisedAccess);
    }

    next();
  } catch (error) {
    console.log(error.message, "Instructor err");
    return jsonResponse(
      res,
      401,
      false,
      message.common.serverError,
      error.message
    );
  }
};

// isAdmin
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return jsonResponse(res, 401, false, message.common.unauthorisedAccess);
    }

    next();
  } catch (error) {
    console.log(error.message, "isAdmin err");
    return jsonResponse(
      res,
      401,
      false,
      message.common.serverError,
      error.message
    );
  }
};
