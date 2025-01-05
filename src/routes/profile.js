const express=require("express");
const profileRouter=express.Router();
const{userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation");

profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{    
    
    const user=req.user;
     
    
    res.send(user) ;}
    catch(err){
        res.status(404).send("Error"+err.message);
    }
    })

    profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
        try {
            if(!validateEditProfileData(req)){
                throw new Error("Invalid edit request");
            }
            const loggedInuser =req.user;
            
            Object.keys(req.body).forEach((key)=>(loggedInuser[key]=req.body[key]))
             await loggedInuser.save();

            res.json({message:`${loggedInuser.firstname},your profile updated Succesfully`,data:loggedInuser,  }
            )
            
        } catch (error) {
            res.status(400).send("Error " +error.message);
        }
    })


module.exports=profileRouter;