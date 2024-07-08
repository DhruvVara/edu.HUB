const { jsonResponse } = require("./responseJson");

exports.validateSchema = (joiSchema) => async (req, res, next) => {
  try {
    await joiSchema.validateAsync(req.body);
    next();
  } catch (err) {
    return jsonResponse(res, 400, false, err.details[0].message);
  }
};
