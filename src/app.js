const express= require("express");
const mongoDb=require("./config/database");
const user = require("./models/user");
const app=express();
const User=require("./models/user");
const validator=require("validator");
const {validatesignUpdata}=require("./utils/validation");
const bcrypt =require("bcrypt");

app.use(express.json());

app.post("/signUp",async(req,res)=>{

    try{ 
    validatesignUpdata(req); 

        const{firstname,lastname,emailId,password}=req.body; 

        const Hashpassword=await bcrypt.hash(password,10);
        

    const user= new User  ({firstname,lastname,emailId,password :Hashpassword  });
   await user.save();
        res.send("User Added Succesfuylly");}
        catch(err){
            res.status(400).send("Error Saving the User"+err.message);
        }
    
})

app.post("/login",async(req,res)=>{
    try {
        const{emailId,password}=req.body;
        const user = await User.findOne({emailId: emailId});
        if(!user){
            throw new Error("Invalid Credentials")
        }
        const isPasswordValid=await bcrypt.compare(password,user.password);
        if(isPasswordValid){
            res.send("Login Successful");
        }
        else{
            throw new Error("Password IS NOT CORRECT");
        }
    } catch (err) {
        res.status(400).send("ERROR: " +err.message);
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

app.patch("/users/:userId",async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;

   
    try{
        const AllowedUpdates=["photoUrl","About","Gender","age","Skills"];
        const isUpdateAllowed=Object.keys(data).every((k)=>AllowedUpdates.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Update Not Allowed");
        }
        if(data?.Skills.length>10){
            throw new Error("Skills Cannot be More than 10")
        }
         const user= await User.findByIdAndUpdate(userId,data,{returnDocument:"after",runValidators:true});
    
        res.send("User Updated Succesfully");

    }catch(err){
        res.status(404).send("Update Failed"+ err.message);
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



