const nodemailer=require("nodemailer");
const path=require("path")
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

module.exports={transporter,mailOptions};
// transporter.sendMail(mailOptions, function (err, info) {
//  console.log(err);
// });