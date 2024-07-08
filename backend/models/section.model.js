const mongoose = require("mongoose");

const sectionSchema = mongoose.Schema({
  sectionName: {
    type: String,
  },
  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    },
  ],
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Section", sectionSchema);
