const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth.middleware")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
} = require("../controllers/Profile.controller")

router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserDetails", auth, getAllUserDetails)



module.exports = router