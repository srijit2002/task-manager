const express=require("express")
const router=express.Router()
const {createUser,getUser,updateUser}=require("../controllers/user")
const {createTask,editTask,deleteTask}=require("../controllers/task")
const {createTokenAndSendVerificationEmail,verifyEmail}=require("../controllers/verificationMail")
router.route("/user/register").post(createUser);
router.route("/user/signin").post(getUser);
router.route("/user/:userId").patch(updateUser);
router.route("/task/:userId").post(createTask).patch(editTask).delete(deleteTask);
router.route("/user/send-verification-email").post(createTokenAndSendVerificationEmail);
router.route("/user/verify-email/:token").get(verifyEmail);


module.exports=router