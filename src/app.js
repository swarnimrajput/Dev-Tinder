const express= require("express");
const app=express();

const {adminAuth}=require("./middlewares/auth")

app.use("/admin",adminAuth);

app.get("/admin/addalluser",(req,res)=>{
    
        res.send("All data sent");
    
})

app.get("/admin/deletealluser",(req,res)=>{
  
        res.send("deleted a user");
    
})

app.listen(3000,()=>{
    console.log("Server conected successfully");
});