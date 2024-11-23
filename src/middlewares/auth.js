 const adminAuth=(req,res,next)=>{
    console.log("Admin Auth is Getting checked");
    const token="xyz";
    const isadminAuthorized=token==="xyz";
    if(!isadminAuthorized){
        res.status(401).send("UnAuthorized request");
    }else{
        next();
    }
};
module.exports={adminAuth,};