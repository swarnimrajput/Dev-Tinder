const validator = require("validator");

const validatesignUpdata=(req)=>{
    const{firstname,lastname,emailId,password}=req.body;
if(!firstname || !lastname){
    throw new Error ("Name is Not valid");

}
else if(!validator.isEmail(emailId)){
    throw new Error ("Email is Not valid");
}
else if(!validator.isStrongPassword(password)){
    throw new Error ("Password is Not valid");
}

}

module.exports = {
    validatesignUpdata
};