 const jwt = require('jsonwebtoken'); 
 const User=require("../models/user");
 
 const userAuth=async(req,res,next)=>{
    try {
        console.log("Cookies:", req.cookies);
        const token = req.cookies.token;
        if(!token){
            throw new Error("Invalid Token"); 
        }
        const decodedmessage=await jwt.verify(token,"DEC@Tinder$456");
        const {_id}=decodedmessage;


const user=await User.findById(_id);
if(!user){
    throw new Error("User Does Not Exist"); 
}
req.user=user;
next();
    } catch (err) {
        res.status(400).send("Error: "+err.message);
    }
};
module.exports={userAuth};