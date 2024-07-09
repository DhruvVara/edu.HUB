const { jsonResponse } = require("../common/jsonResponse");
const { message } = require("../common/messages");
const Profile = require("../models/ProfileSchema");
const User = require("../models/User");

// update Profile
exports.updateProfile = async (req, res) => {
  let status = false;
  try {
    const {
      firstName = "",
      lastName = "",
      dateOfBirth = "",
      about = "",
      contactNumber = "",
      gender = "",
    } = req.body;
    const id = req.user.id;

    // Find the profile by id
    const userDetails = await User.findById({ _id: id });
    const profile = await Profile.findById(userDetails.additionalDetails);

    const user = await User.findByIdAndUpdate(id, {
      firstName,
      lastName,
    });
    await user.save();

    // Update the profile fields
    profile.dateOfBirth = dateOfBirth;
    profile.about = about;
    profile.contactNumber = contactNumber;
    profile.gender = gender;

    // Save the updated profile
    await profile.save();

    // Find the updated user details
    const updatedUserDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    status = true;
    return jsonResponse(
      res,
      200,
      status,
      message.profile.profileUpdated,
      updatedUserDetails
    );
  } catch (error) {
    // console.log(error);
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
};

// delete Account

exports.deleteAccount = async (req, res) => {
  let status = false;
  try {
    // console.log(req.user.id)
    const id = req.user.id;

    const userDetails = await User.findById(id);

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: "User Not Found",
      });
    }

    await Profile.findByIdAndDelete(userDetails.additionalDetails);
    await User.findByIdAndDelete(id);

    // unenroll user from all course

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully",
    });
  } catch (error) {
    // console.log(err.message, "Internal Server Error");
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
};

// Fetched User Details
exports.getAllUserDetails = async (req, res) => {
  let status = false;
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();

    status = true;

    return jsonResponse(
      res,
      200,
      status,
      "User Details Fetched Successfully",
      userDetails
    );
  } catch (error) {
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
};
