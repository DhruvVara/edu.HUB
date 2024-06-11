const sectionSchema = require("../models/section.model");
const subSectionSchema = require("../models/subSection.model");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create
exports.createSubSection = async (req, res) => {
    try {

        const { sectionId, title, timeDuration, description } = req.body;

        if (!sectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success: false,
                message: "Missing Information"
            })
        }

        // extract video
        // const video = req.files.videoFile;

        // Upload Video
        // const uploadDetails = new uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const SubSectionDetail = await subSectionSchema.create({
            title,
            timeDuration,
            description,
            videoUrl: "uploadDetails.secure_url"
        })

        const sectionDetails = await sectionSchema.findByIdAndUpdate(
            sectionId,
            {
                $push: {
                    subSection: SubSectionDetail._id
                }
            }, { new: true }).populate("subSection");

        if (!sectionDetails) {
            return res.status(400).json({
                success: false,
                message: "Section is Not present"
            })
        }

        return res.status(200).json({
            success: true,
            message: "SubSection is created Successfully",
            data: sectionDetails
        })

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({
            status: false,
            message: err.message
        })
    }
}

// update
exports.updateSubSection = async (req, res) => {
    try {

        const { sectionId, subSectionId, title, description } = req.body
        const subSection = await subSectionSchema.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        if (title !== undefined) {
            subSection.title = title
        }

        if (description !== undefined) {
            subSection.description = description
        }
        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

        const updatedSection = await sectionSchema.findById(sectionId).populate("subSection")


        return res.json({
            success: true,
            data: updatedSection,
            message: "Section updated successfully",
        })


    } catch (err) {
        console.log(err.message, "Error occured while updating subsection");
        return res.status(500).json({
            success: false,
            message: "Error during updating subsection"
        })
    }
}


// delete
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body
        await sectionSchema.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )
        const subSection = await subSectionSchema.findByIdAndDelete({ _id: subSectionId })

        if (!subSection) {
            return res
                .status(404)
                .json({ success: false, message: "SubSection not found" })
        }

        const updatedSection = await sectionSchema.findById(sectionId).populate("subSection")

        return res.json({
            success: true,
            data: updatedSection,
            message: "SubSection deleted successfully",
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "An error occurred while deleting the SubSection",
        })
    }
}