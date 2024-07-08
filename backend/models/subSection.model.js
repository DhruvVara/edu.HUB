const mongoose = require("mongoose");

const subSectionSchema = mongoose.Schema({
  title: {
    type: String,
  },
  timeDuration: {
    type: String,
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
