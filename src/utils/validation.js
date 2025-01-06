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
const validateEditProfileData = (req) => {
    const allowedFields = ["firstname", "lastname", "photoUrl", "age", "gender", "About", "Skills"];
    const requestFields = Object.keys(req.body).map(field => field.toLowerCase());
    const normalizedAllowedFields = allowedFields.map(field => field.toLowerCase());

    const isEditAllowed = requestFields.every((field) => normalizedAllowedFields.includes(field));
    return isEditAllowed;
};



module.exports = {
    validatesignUpdata,validateEditProfileData
};