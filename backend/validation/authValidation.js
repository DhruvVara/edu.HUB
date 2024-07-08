const Joi = require("joi");

exports.signUpSchema = Joi.object().keys({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
  contactNumber: Joi.number().max(10),
  opt: Joi.number(),
  accountType: Joi.string().valid("Admin", "Student","Instructor"),
  //   confirmPassword: Joi.string().min(5).equal(Joi.ref("password")).required(),
  //   dob: Joi.string(),
});

exports.signInSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

