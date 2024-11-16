const express= require("express");
const app=express();


app.get("/test",(req,res)=>{
    res.send("Hello from the get call");
})

app.post("/test",(req,res)=>{
    res.send("Hello from the post call");
})

app.delete("/test",(req,res)=>{
    res.send("Deleted");
})

app.patch("/test",(req,res)=>{
    res.send("Patch Call");
})

app.put("/test",(req,res)=>{
    res.send({firstname:"Swarnim",lastname:"Rajput"})
})

app.use("/test",(req,res)=>{
    res.send("Hello From the Server");
})



app.listen(3000,()=>{
    console.log("Server conected successfully");
});