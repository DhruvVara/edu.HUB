const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Category", CategorySchema);
