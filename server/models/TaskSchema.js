const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A task should always contain a title"],
    trim: true,
  },
  details: {
    type: String,
    trim: true,
    default:"No details provided"
  },
  roomCode: {
    type: String,
    default:""
  },
  dueDate:{
    type:String,
    default:"No due date"
  },//input format month/date/year
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = taskSchema;
