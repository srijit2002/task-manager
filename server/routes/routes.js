const express=require("express")
const router=express.Router()
const {createUser,getUser}=require("../controllers/user")
const {createTask,editTask,deleteTask}=require("../controllers/task")

router.route("/user/register").post(createUser);
router.route("/user/signin").post(getUser);
router.route("/task/:userId").post(createTask).patch(editTask).delete(deleteTask);



module.exports=router