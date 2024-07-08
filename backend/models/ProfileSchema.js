const mongoose = require("mongoose");

const profileSchema = mongoose.Schema(
  {
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: String,
    },
    about: {
      type: String,
      trim: true,
    },
    contactNumber: {
      type: Number,
      trim: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
