const express = require("express")
const router = express.Router()

// IMPORTING course controller
const { createCourse, showAllCourses } = require("../controllers/Course.controller")

// IMPORTING section controller
const { addSection, updateSection, deleteSection } = require("../controllers/Section.controller");

// IMPORTING subSection controller
const { createSubSection, updateSubSection, deleteSubSection } = require("../controllers/subSection.controller");

// IMPORTING middleware
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth.middleware");


// courses routes
// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse);


// Course Section routes
//Add a Section to a Course
router.post("/createSection", auth, isInstructor, addSection);

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)


// Course Subsection routes
// Add a Sub Section to a Section
router.post("/createSubSection", auth, isInstructor, createSubSection);

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)


// completed subsection


module.exports = router