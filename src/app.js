const express= require("express");
const app=express();

const {adminAuth}=require("./middlewares/auth")
// if there is any error we can always try to handle that using try and catch block
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something Went Wrong");
    }
   
  
})

app.get("/getuserData",(req,res)=>{
    try {
        throw new Error("sfbsfbjbfb");
    res.send("User data sent");
    } catch (err) {
        res.status(500).send("Some unexpected error happened");
    }
    
})



app.listen(3000,()=>{
    console.log("Server conected successfully");
});