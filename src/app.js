const express= require("express");
const mongoDb=require("./config/database");

const app=express();
const User=require("./models/user");
const {validatesignUpdata}=require("./utils/validation");
const validator=require("validator");





const cookkieparser=require("cookie-parser");
const jwt=require("jsonwebtoken");



app.use(express.json());
app.use(cookkieparser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const RequestRouter=require("./routes/request");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",RequestRouter  );







mongoDb().then(()=>{
    console.log("Database Connected");
    app.listen(3000,()=>{
        console.log("Server conected successfully");
    });
})
.catch((err)=>{
    console.log("Database cannot be connected");
});



