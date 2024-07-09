const { jsonResponse } = require("../common/jsonResponse");
const { message } = require("../common/messages");
const courseSchema = require("../models/course.model");
const sectionSchema = require("../models/section.model");

// Create Section
exports.addSection = async (req, res) => {
  let status = false;
  try {
    const newSection = await sectionSchema.create({ sectionName });

    const updatedCourse = await courseSchema
      .findByIdAndUpdate(
        courseId,
        {
          $push: {
            courseContent: newSection._id,
          },
        },
        { new: true }
      )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!updatedCourse) {
      return jsonResponse(res, 400, status, message.course.notFound);
    }

    status = true;
    return jsonResponse(
      res,
      200,
      status,
      message.section.createdSuccessfully,
      updatedCourse
    );
  } catch (error) {
    // console.log(error.message, "Error occurred while adding section");
    return jsonResponse(res, 500, status, message.common.serverError);
  }
};

// Update Section
exports.updateSection = async (req, res) => {
  let status = false;
  try {
    const { sectionId, sectionName } = req.body;

    const sectionDetails = await sectionSchema.findByIdAndUpdate(
      sectionId,
      {
        sectionName,
      },
      { new: true }
    );

    if (!sectionDetails) {
      return jsonResponse(res, 400, status, message.section.notFound);
    }

    status = true;
    return jsonResponse(
      res,
      200,
      status,
      message.section.sectionUpdated,
      sectionDetails
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

// Delete Section
exports.deleteSection = async (req, res) => {
  let status = false;
  try {
    const { sectionId } = req.body;

    const sectionDetails = await sectionSchema.findByIdAndDelete({ sectionId });

    if (!sectionDetails) {
      return jsonResponse(res, 400, status, message.section.notFound);
    }
    status = true;
    return jsonResponse(res, 200, status, message.section.sectionDeleted);
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
