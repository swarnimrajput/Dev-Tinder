const express=require("express");
const RequestRouter=express.Router();
const{userAuth}=require("../middlewares/auth");

RequestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;

    
    res.send(user.firstname+" Sent the Connection Request"); 
});

module.exports=RequestRouter;
