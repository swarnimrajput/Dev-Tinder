const express= require("express");
const mongoDb=require("./config/database");
const app=express();
const User=require("./models/user");


app.post("/signUp",async(req,res)=>{
    const user= new User  ({
        firstname:"Swarnim ",
        lastname:"Rajput",
        emailId:"Swarnimrajput5826@gmail.com",
        password:"2344555uhf",


    });
    try{await user.save();
        res.send("User Added Succesfuylly");}
        catch(err){
            res.status(400).send("Error Saving the User"+err.message);
        }
    
})

mongoDb().then(()=>{
    console.log("Database Connected");
    app.listen(3000,()=>{
        console.log("Server conected successfully");
    });
})
.catch((err)=>{
    console.log("Database cannot be connected");
});



