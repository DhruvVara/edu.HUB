// !courseName || !courseDescription || !whatYouWillLearn || !category || !price || !tag || !instructions

const Joi = require("joi");

exports.courseSchema = Joi.object().keys({
  courseName: Joi.string().min(2).required("Course name is required"),
  courseDescription: Joi.string().min(20).required("Course description is required"),
  whatYouWillLearn: Joi.string().email().required( "whatYouWillLearn section is required"),
  category: Joi.string().required("Category is Required"),
  price: Joi.number("Price is Required"),
  tag: Joi.number("Tag is requires"),
  instructions: Joi.string().valid("Admin", "Student", "Instructor"),
  //   confirmPassword: Joi.string().min(5).equal(Joi.ref("password")).required(),
  //   dob: Joi.string(),
});
