const express= require("express");
const mongoDb=require("./config/database");
const user = require("./models/user");
const app=express();
const User=require("./models/user");
const validator=require("validator");
const {validatesignUpdata}=require("./utils/validation");
const bcrypt =require("bcrypt");
const cookkieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const{userAuth}=require("./middlewares/auth");


app.use(express.json());
app.use(cookkieparser());

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
        const isPasswordValid=await user.validatePassword(password);
        if(isPasswordValid){
            

            const token =await user.getJWT();
             

            res.cookie("token",token,{
                expires: new Date(Date.now()+2*3600000),
            }); 
            
            res.send("Login Successful");
        }
        else{
            throw new Error("Password IS NOT CORRECT");
        }
    } catch (err) {
        res.status(400).send("ERROR: " +err.message);
    }
})

app.get("/profile",userAuth,async(req,res)=>{
try{
    
    

const user=req.user;
 

res.send(user) ;}
catch(err){
    res.status(404).send("Error"+err.message);
}
})

app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
    const user=req.user;

    
    res.send(user.firstname+" Sent the Connection Request"); 
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



