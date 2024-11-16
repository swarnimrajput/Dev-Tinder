const express= require("express");
const app=express();

app.use("/",(req,res)=>{
    res.send("Hello ");
})

app.use("/get",(req,res)=>{
    res.send("Hello ");
})

app.use("/test",(req,res)=>{
    res.send("Hello From the Server");
})

app.listen(3000,()=>{
    console.log("Server conected successfully");
});