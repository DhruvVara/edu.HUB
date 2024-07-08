// sectionId, title, timeDuration, description

const Joi = require("joi");

exports.subSectionSchema = Joi.object().keys({
  sectionId: Joi.string().required("Invalid sectionId."),
  title: Joi.string().min(3).required("Title is required."),
  timeduration: Joi.string().required("Duration is required."),
  description: Joi.string().required("Description is required."),
});
