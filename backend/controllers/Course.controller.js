const courseSchema = require("../models/course.model");
const categorySchema = require("../models/category.model");
const userSchema = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { message } = require("../common/messages");
const { jsonResponse } = require("../common/jsonResponse");

// create course handler
exports.createCourse = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      category,
      price,
      tag,
      instructions,
      status = "",
    } = req.body;

    if (!status || status === undefined) {
      status = "Draft";
    }

    // Find instructor and verify the instructor
    const userId = req.user.id;
    const instructorDetails = await userSchema.findById(userId, {
      accountType: "Instructor",
    });
    // console.log("instructionDetails(Course.js", instructorDetails)
    if (!instructorDetails) {
      return jsonResponse(res, 404, false, message.instructor.notFound);
    }

    const categoryDetails = await categorySchema.findById(category);
    if (!categoryDetails) {
      return jsonResponse(res, 404, false, message.category.notFound);
    }

    // Upload images to cloudinary
    // const thumbnailImage = await uploadImageToCludinary(thumbnailDetail, process.env.FOLDER_NAME);
    // console.log(thumbnailImage);

    const newCourse = await courseSchema.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag,
      category: categoryDetails._id,
      thumbnail: "thumbnailImage.secure_url",
      status: status,
      instructions,
    });

    // add new course to instructor schema
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          Courses: newCourse._id,
        },
      },
      { new: true }
    );

    // Adding course to the categories

    const categoryDetails2 = await categorySchema.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return jsonResponse(
      res,
      200,
      true,
      message.course.createdSuccessfully,
      newCourse
    );
  } catch (error) {
    // console.log("err", error.message);
    return jsonResponse(
      res,
      500,
      false,
      message.common.serverError,
      error.message
    );
  }
};

// get all courses handler function
exports.showAllCourses = async (req, res) => {
  try {
    // const {}=req.body;

    const allCourses = await courseSchema
      .find(
        { status: "Published" },
        {
          courseName: true,
          price: true,
          thumbnail: true,
          instructor: true,
          ratingAndReview: true,
          studentsEnrolled: true,
        }
      )
      .populate("instructor")
      .exec();


    return jsonResponse(res,200,true,message.coursefetchedCourseSuccessfully,allCourses);
  } catch (error) {
    // console.log(err.message, "Error Fetch courses");
    return jsonResponse(
        res,
        500,
        false,
        message.common.serverError,
        error.message
      );
};
