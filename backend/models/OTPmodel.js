const mongoose = require("mongoose");
// const mailSender = require("../utils/mailSender");

const otpSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        otp: {
            type: Number,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 5 * 60,
        }
    }
)

// async function sendVerificationEmail(email,otp){
//     try{
//         const mailResponse= await mailSender(email,"Verification Mail",otp);

//     }catch(err){
//         console.log(err.message,"error occurred while sending mail")
//     }
// }

// otpSchema.pre("save",async function(next){
//     await sendVerificationEmail(this.email,this.otp);
//     next(); 
// })

module.exports = mongoose.model("Otp", otpSchema);