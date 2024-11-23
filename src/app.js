const express= require("express");
const app=express();
//we can also send in the form of array and we can also mis n match it will work in the same order
app.use("/user",[(req,res,next)=>{
    console.log("Handling the user route");
    next();
},(req,res,next)=>{
    console.log("Handl;ing thew seerver ");
    //res.send("Server conected by 2");
    next();
}],(req,res,next)=>{
    console.log("Handl;ing thew seerver ");
    //res.send("Server conected by 2");
    next();
},(req,res,next)=>{
    console.log("Handl;ing thew seerver ");
    //res.send("Server conected by 2");
    next();
},(req,res,next)=>{
    console.log("Handl;ing thew seerver ");
    res.send("Server conected by 5");
    //next();
})

app.listen(3000,()=>{
    console.log("Server conected successfully");
});