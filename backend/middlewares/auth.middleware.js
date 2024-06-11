const jwt = require("jsonwebtoken");
const user = require("../models/User");


// auth
exports.auth = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization.replace("Bearer ", ""));
        // const token = req.cookie.token || req.body.token || req.headers("Authorization").replace("Bearer", "") || req.headers.cookie.slice(6);
        const token = req.headers.authorization;
        // console.log(token)
        // console.log("auth")
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing"
            })
        }

        // Verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = decode;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token",
            })
        }
        // console.log("auth")

        next();

    } catch (err) {
        console.log(err.message, "auth error");
        return res.status(401).json({
            success: false,
            message: "Server error"
        })
    }

}

// is Student
exports.isStudent = async (req, res, next) => {

    try {

        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "Only for Student"
            })
        }

    } catch (Err) {
        console.log(Err.message, "isStudent err")
        return res.status(500).json({
            success: false,
            message: "User role cannot be verfied"
        })
    }
}


// isInstructor
exports.isInstructor = async (req, res, next) => {

    try {
        // console.log("INstructor")

        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "Only for Instructor"
            })
        }

        next();

    } catch (Err) {
        console.log(Err.message, "Instructor err")
        return res.status(500).json({
            success: false,
            message: "User role cannot be verfied"
        })
    }

}


// isAdmin
exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "Only for Admin"
            })
        }

        next();

    } catch (Err) {
        console.log(Err.message, "isAdmin err")
        return res.status(500).json({
            success: false,
            message: "User role cannot be verfied"
        })
    }
}