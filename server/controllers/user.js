const bcrypt=require("bcryptjs");
const userModel=require("../models/UserModel")

const createUser=async(req,res)=>{
    try {
        const {name,email,password,occupation}=req.body;
        const prevInstance=await userModel.findOne({email})
        if(prevInstance) throw new Error("This email already exists, try with a different one or sign in")
        const bcryptSalt=await bcrypt.genSalt();
        const enCryptedPassword=await bcrypt.hash(password,bcryptSalt);
        const {email:userEmail,name:userName,occupation:userOccupation,tasks,totalCompletedTasks,_id}=await userModel.create({name,email,password:enCryptedPassword,occupation});
        res.status(201).json({success:true,message:"New user created successfully",data:{userEmail,userName,userOccupation,tasks,totalCompletedTasks,_id}})
    } catch (error) {
        res.status(401).json({message:error?.message||"Some error occured"})
    }
    
}
const getUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const prevInstance=await userModel.findOne({email})
        if(!prevInstance) throw new Error("You don't have any account associated with this email. Try to create a new account")
        if(await bcrypt.compare(password,prevInstance.password)){
            const {name:userName,email:userEmail,_id,occupation:userOccupation,tasks,totalCompletedTasks}=prevInstance;
            res.status(200).json({success:true,message:"Signed in successfully",data:{userEmail,userName,userOccupation,tasks,totalCompletedTasks,_id}})
        }
        else{
            throw new Error("Email or password does not match")
        }
    } catch (error) {
        res.status(401).json({message:error?.message||"Some error occured"})
    }

}

module.exports={createUser,getUser}