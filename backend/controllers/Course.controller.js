const courseSchema = require("../models/course.model");
const categorySchema = require("../models/category.model");
const userSchema = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// create course handler
exports.createCourse = async (req, res) => {
    try {
        let { courseName, courseDescription, whatYouWillLearn, category, price, tag, instructions, status="" } = req.body;
        // console.log(req.files.thumbnail);
        // const thumbnailDetail  = req.files.thumbnail;
        console.log("create")

        if (!courseName || !courseDescription || !whatYouWillLearn || !category || !price || !tag || !instructions) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory",
            })
        }

        if (!status || status === undefined) {
            status = "Draft"
        }

        // Find instructor and verify the instructor 
        const userId = req.user.id;
        const instructorDetails = await userSchema.findById(userId, { accountType: "Instructor", });
        // console.log("instructionDetails(Course.js", instructorDetails)
        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor Details not found"
            })
        }

        const categoryDetails = await categorySchema.findById(category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Tag Details not found"
            })
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
        })


        // add new course to instructor schema
        await User.findByIdAndUpdate({
            _id: instructorDetails._id,
        },
            {
                $push: {
                    Courses: newCourse._id
                }
            }, { new: true })



        // Adding course to the categories

        const categoryDetails2 = await categorySchema.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true }
        )


        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse
        })

    } catch (err) {
        console.log("err",err.message);
        return res.status(500).json({
            success: false,
            message: err.message
        })
    }
}


// get all courses handler function
exports.showAllCourses = async (req, res) => {
    try {

        // const {}=req.body;

        const allCourses = await courseSchema   .find({ status: "Published" },
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReview: true,
                studentsEnrolled: true,
            }).populate("instructor").exec();

        return res.status(200).json({
            success: true,
            message: "Succesffully Retrived",
            data: allCourses
        })

    } catch (err) {
        console.log(err.message, "Error Fetch courses")
        return res.status(500).json({
            success: false,
            message: "Cannot Fetch Courses",
            error: err.message
        })
    }
}