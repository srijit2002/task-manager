const bcrypt=require("bcryptjs");
const userModel=require("../models/UserModel");
const {transporter,mailOptions}=require("../auth/nodemailer");

const createUser=async(req,res)=>{
    try {
        //finding if previous instance existed or not
        //if yes then showing user an error
        const {name,email,password,occupation}=req.body;
        const prevInstance=await userModel.findOne({email})
        if(prevInstance) throw new Error("This email already exists, try with a different one or sign in")
        
        // configuring nodemailer options and changing sender email address
        const configuredMailOptions={...mailOptions,to:email}
        
        //hashing password for security reasons
        const bcryptSalt=await bcrypt.genSalt();
        const enCryptedPassword=await bcrypt.hash(password,bcryptSalt);
        const {email:userEmail,name:userName,occupation:userOccupation,tasks,totalCompletedTasks,_id}=await userModel.create({name,email,password:enCryptedPassword,occupation});
        //configurig email and if some thing fails
        //show error and stop authentication
        //create new mail options and add user name to it
        res.status(201).json({success:true,message:"New user created successfully",data:{userEmail,userName,userOccupation,tasks,totalCompletedTasks,_id}})
        await transporter.sendMail(configuredMailOptions);
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

const updateUser=async(req,res)=>{
    try {
        const {userId:_id}=req.params;
        const {name,email,occupation}=req.body;
        const updatedUser=await userModel.findOneAndUpdate({_id},{name,email,occupation},{new:true});
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error?.message||"Some error occured"})
    }
}
module.exports={createUser,getUser,updateUser}