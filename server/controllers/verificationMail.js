const tokenModel = require("../models/Token");
const userModel=require("../models/UserModel")
const crypto = require("crypto");
const { sendVerificationEmail } = require("../auth/nodemailer");

const createTokenAndSendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("NO email found");
    await tokenModel.findOneAndDelete({ email });
    const newToken = crypto.randomBytes(32).toString("hex");
    await tokenModel.create({ email, token: newToken });
    await sendVerificationEmail(newToken, email);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    res.status(500).send(error?.message || "Some error occured");
  }
};

const verifyEmail=async(req,res)=>{
    try {
        const {token}=req.params;
        const {email}=await tokenModel.findOne({token});
        if(!email) throw new Error("Your token has expired, resend verification email");
        await userModel.findOneAndUpdate({email},{isVerified:true});
        res.status(200).send(`<h1>Email successfully verified, now <a href="https://task-manager-dashboard.herokuapp.com/">Sign in</a> to your account</h1>`)
    } catch (error) {
         res.status(500).send(error?.message || "Some error occured");
    }
}

module.exports = {createTokenAndSendVerificationEmail,verifyEmail};
