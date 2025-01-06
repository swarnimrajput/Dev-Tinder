const express=require("express");
const RequestRouter=express.Router();
const{userAuth}=require("../middlewares/auth");
const User =require("../models/user");

const ConnectionRequest = require("../models/connectionrequest");


RequestRouter.post("/request/send/:status/:touserId",userAuth,async(req,res)=>{
    const user=req.user;
    try {
        const fromuserId=req.user._id;
        const touserId=req.params.touserId;
        const status =req.params.status;

        const allowedStatus=["ignored","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(404).json({
                message:"Invalid staus Type: " + status
            })
        }
        const toUser = await User.findById(touserId);
        if(!toUser){
            return res.status(404).json({
                message:"User Not Found",
            })
        }
        const existingConnectionRequest =await ConnectionRequest.findOne({
            $or:[
                {fromuserId,touserId},
                {fromuserId:touserId,touserId:fromuserId}, 
            ]
        })
        if( existingConnectionRequest){
            return res.status(400).send({message:"Connection Already Exist"});
        }

const connectionRequest=new ConnectionRequest({
    fromuserId,touserId,status,
})
const data = await connectionRequest.save()
res.json({
    message:req.user.firstname + "is "+status+ "in" +toUser.firstname,
    data,
}); 

    } catch (error) {
        res.status(404).send("ERROR "+error.message);
    }

    
    
});

module.exports=RequestRouter;
