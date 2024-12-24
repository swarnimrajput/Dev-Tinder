const express= require("express");
const mongoDb=require("./config/database");
const user = require("./models/user");
const app=express();
const User=require("./models/user");

app.use(express.json());
app.post("/signUp",async(req,res)=>{
    const user= new User  (req.body);
    try{await user.save();
        res.send("User Added Succesfuylly");}
        catch(err){
            res.status(400).send("Error Saving the User"+err.message);
        }
    
})

app.get("/users",async (req,res)=>{
    const userEMAIL=req.body.emailId;
    try{


        //  const users= await User.findOne({emailId:userEMAIL});
        //  if(!users)res.status(404).send("User not found");
        //  else{
        //     res.send(users);
        //  }
        if(users.length===0){
            res.status(404).send("User not found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(404).send("User not found");
    }
})

app.get("/feed",async(req,res)=>{
    try{
        const users= await User.find({});
        res.send(users);
    }catch(err){
        res.status(404).send("User not found");
    }
})

app.delete("/users",async(req,res)=>{
    const userId=req.body.userId;
    try{
        const user= await User.findByIdAndDelete(userId);
        res.send("User Deleted Succesfully");
    }catch(err){
        res.status(404).send("User not found");
    }
})

app.patch("/users",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    console.log(data);
    try{
          await User.findByIdAndUpdate(userId,data,{returnDocument:"after"});
        res.send("User Updated Succesfully");
    }catch(err){
        res.status(404).send("User not found");
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



