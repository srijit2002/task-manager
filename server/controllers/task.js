const userModel = require("../models/UserModel");

const createTask = async (req, res) => {
  const task = req.body;
  try {
    // const prevInstance=await userModel.find({tasks: {$elemMatch: {title:task.title}}});
    // if(prevInstance) throw new Error("This task already exists")
    const newTask = await userModel.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $push: { tasks: task },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      data: newTask.tasks,
      message: "Task created successfully",
    });
  } catch (error) {
    res.status(400).send(error?.message || "Some error occcured");
  }
};
const editTask = async (req,res) => {
  try {
      const{title,details,roomCode,dueDate,isCompleted,_id}=req.body;
      const {userId}=req.params;
      const updatedTask=await userModel.findOneAndUpdate(
      { _id:userId, "tasks._id":_id},
      {
          $set: {
              "tasks.$.title":title,
              "tasks.$.details":details,
              "tasks.$.roomCode":roomCode,
              "tasks.$.dueDate":dueDate,
              "tasks.$.isCompleted":isCompleted,
           }
      },{new:true})
      res.status(200).json(updatedTask.tasks)
  } catch (error) {
    res.status(400).send(error?.message || "Some error occcured");
  }
};

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const { userId } = req.params;
    const modifiedTasks = await userModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { tasks: { _id: taskId } } },
      { new: true }
    );
    res.status(200).json(modifiedTasks.tasks);
  } catch (error) {
    res.status(400).send(error?.message || "Some error occcured");
  }
};
module.exports = { createTask, editTask, deleteTask };
