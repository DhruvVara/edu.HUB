// courseId, sectionName

const Joi = require("joi");

exports.sectionSchema = Joi.object().keys({
  courseId: Joi.string().required("Invalid CourseId."),
  sectionName: Joi.string().min(3).required("Section Name is required"),
});
