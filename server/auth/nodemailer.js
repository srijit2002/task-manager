const nodemailer=require("nodemailer");
require("dotenv").config()
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.GMAIL__USER,
    pass:process.env.GMAIL__PASSWORD,
  },
});

const mailOptions = {
  from: 'teammanager2021bysrijit@gmail.com',
  to: "srijitm906@gmail.com",
  subject: `Hello from team manager`,
  html: `Thanks for using team-manager,we are pleased to have you with us`
};

const verificationMailOptions={
  from: 'teammanager2021bysrijit@gmail.com',
  to: "srijitm906@gmail.com",
  subject: `Verify Email`,
  html: ``
}
const sendVerificationEmail=async(token,email)=>{
  const newHtmlBody=`Thanks for using team-manager. click this <a href="http://localhost:8000/api/v1/user/verify-email/${token}">link</a> to verify your email, if this was not you simply ignore this email`
  const modifiedOptions={...verificationMailOptions,html:newHtmlBody,to:email}
  await transporter.sendMail(modifiedOptions)
}
module.exports={transporter,mailOptions,sendVerificationEmail};
