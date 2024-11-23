const express= require("express");
const app=express();

app.use("/user",(req,res,next)=>{
    console.log("Handling the user route");
    //if next is used first then below function will printed and the tcp connection will be closed so it cant exexute bellow message
    //it will give an error that "Cannot set headers after they are sent to the client"
    //next();
    //res.send("server connected");
    //If next is not present here then server will keep hittng and no response will be sent by the server
    next();
    //if we use next then the below function message will be printed
},(req,res)=>{
    console.log("Handl;ing thew seerver ");
    res.send("Server conected by 2");
})

app.listen(3000,()=>{
    console.log("Server conected successfully");
});