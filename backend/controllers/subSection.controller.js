const { jsonResponse } = require("../common/jsonResponse");
const { message } = require("../common/messages");
const sectionSchema = require("../models/section.model");
const subSectionSchema = require("../models/subSection.model");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create
exports.createSubSection = async (req, res) => {
  let status = false;
  try {
    const { sectionId, title, timeDuration, description } = req.body;

    // extract video
    // const video = req.files.videoFile;

    // Upload Video
    // const uploadDetails = new uploadImageToCloudinary(video, process.env.FOLDER_NAME);

    const SubSectionDetail = await subSectionSchema.create({
      title,
      timeDuration,
      description,
      videoUrl: "uploadDetails.secure_url",
    });

    const sectionDetails = await sectionSchema
      .findByIdAndUpdate(
        sectionId,
        {
          $push: {
            subSection: SubSectionDetail._id,
          },
        },
        { new: true }
      )
      .populate("subSection");

    if (!sectionDetails) {
      return jsonResponse(res, 400, status, message.section.notFound);
    }

    status = true;
    return jsonResponse(
      res,
      200,
      status,
      message.subSection.createdSuccessfully,
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

// update
exports.updateSubSection = async (req, res) => {
  let status = false;
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await subSectionSchema.findById(subSectionId);

    if (!subSection) {
      return jsonResponse(res, 404, status, message.subSection.notFound);
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    await subSection.save();

    const updatedSection = await sectionSchema
      .findById(sectionId)
      .populate("subSection");
    status = true;
    return jsonResponse(res, 200, status, message.subSection.subSectionUpdated);
  } catch (error) {
    // console.log(error.message, "Error occured while updating subsection");
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
};

// delete
exports.deleteSubSection = async (req, res) => {
  let status = false;
  try {
    const { subSectionId, sectionId } = req.body;
    await sectionSchema.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await subSectionSchema.findByIdAndDelete({
      _id: subSectionId,
    });

    if (!subSection) {
      return jsonResponse(res, 404, status, message.subSection.notFound);
    }

    const updatedSection = await sectionSchema
      .findById(sectionId)
      .populate("subSection");

    status = true;
    return jsonResponse(
      res,
      200,
      status,
      message.subSection.deleteSubSection,
      updatedSection
    );
  } catch (error) {
    // console.error(error);
    return jsonResponse(
      res,
      500,
      status,
      message.common.serverError,
      error.message
    );
  }
};
