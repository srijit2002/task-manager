const mongoose=require("mongoose")
const taskSchema=require("./TaskSchema")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        trim:true,
        maxlength:[20,"Name can not be more than 20 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter your email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your password"],
    },
    tasks:{
        type:[taskSchema],
        default:[]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    occupation:{
        type:String,
        required:[true,"Please provide your occupation"]
    }
})

module.exports=mongoose.model("user",userSchema)