const {validatesignUpdata}=require("../utils/validation");
const User= require("../models/user");
const bcrypt =require("bcrypt");

const express=require("express");
const authRouter=express.Router();



authRouter.post("/signUp",async(req,res)=>{

    try{ 
    validatesignUpdata(req); 

        const{firstname,lastname,emailId,password}=req.body; 

        const Hashpassword=await bcrypt.hash(password,10);
        

    const user= new User  ({firstname,lastname,emailId,password :Hashpassword  });
   await user.save();
        res.send("User Added Succesfuylly");}
        catch(err){
            res.status(400).send("Error Saving the User"+err.message);
        }
    
})

authRouter.post("/login",async(req,res)=>{
    try {
        const{emailId,password}=req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            

            const token =await user.getJWT();
             

            res.cookie("token",token,{
                expires: new Date(Date.now()+2*3600000),
            }); 
            
            res.send("Login Successful");
        }
        else{
            throw new Error("Password IS NOT CORRECT");
        }
    } catch (err) {
        res.status(400).send("ERROR: " +err.message);
    }
})

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
    })
    res.send("Logout Succesfull");
})


module.exports=authRouter;