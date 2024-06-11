const courseSchema = require("../models/course.model");
const sectionSchema = require("../models/section.model");

// Create Section
exports.addSection = async (req, res) => {
    try {
        const { courseId, sectionName } = req.body;

        if (!courseId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Missing Information"
            })
        }

        const newSection = await sectionSchema.create({ sectionName });

        const updatedCourse = await courseSchema.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                },
            },
            { new: true })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                }
            }).exec();

        if (!updatedCourse) {
            return res.status(400).json({
                success: false,
                message: "Course is Not present",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Section added successfullly",
            data: updatedCourse,
        })


    } catch (err) {
        console.log(err.message, "Error occurred while adding section");
        return res.status(500).json({
            success: false,
            message: "Server Error while adding section"
        })
    }
}

// Update Section
exports.updateSection = async (req, res) => {
    try {

        const { sectionId, sectionName } = req.body;
        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Missing Information"
            })
        }

        const sectionDetails = await sectionSchema.findByIdAndUpdate(
            sectionId,
            {
                sectionName
            }, { new: true }
        );

        if (!sectionDetails) {

            return res.status(400).json({
                success: false,
                message: "Section is not present"
            })

        }

        return res.status(200).json({
            success: true,
            message: "Section Updated Successfully",
            data: sectionDetails
        })

    } catch (err) {
        console.log(err.message, "Error occured during updating section");
        return res.status(500).json({
            success: false,
            message: "Error occcured while updating section"
        })
    }
}


// Delete Section
exports.deleteSection = async (req, res) => {
    try {

        const { sectionId } = req.body;
        if (!sectionId) {
            return res.status(400).json({
                success: false,
                message: "All fields are mandatory"
            })
        }

        const sectionDetails = await sectionSchema.findByIdAndDelete({ sectionId });

        if (!sectionDetails) {
            return res.status(400).json({
                success: false,
                message: "Section is not present"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Section Deleted Successfully"
        })



    } catch (err) {
        console.log(err.message, "Error occured during updating section");
        return res.status(500).json({
            success: false,
            message: "Error occcured while updating section"
        })
    }
}
