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