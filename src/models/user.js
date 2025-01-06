const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        maxlength:255,
    },
    lastname:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique: true,
        trim:true, 
        //Restricting Choices: Use enum when you want to ensure that a field can only take one value out of a predefined set of values.
        // enum:["@","gmail","com"]
        // This is the one way validate: {
        //     validator: function (v) {
        //         // Regex for validating Gmail addresses
        //         return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(v);
        //     },
        //     message: (props) => `${props.value} is not a valid Gmail address!`
        // }
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email format " + value);
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Password Should Be Strong " );
            }
        }
        
    },
    age:{
        type:Number,
        min:18,
        max:60,
    },
    gender:{
        type:String,
        enum:["Male","Female","Others"],
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photoURl format " + value);
            }
        }
    },
    About:{
        type:String,
        default:"Hey this is the default About us ",

    },
    Skills:{
        type:[String],
    }
},{
    timestamps:true,
});
userSchema.methods.getJWT=async function(){
    const user = this ;
    const token = await jwt.sign({_id:user._id},"DEC@Tinder$456",{
        expiresIn:"7d",
    }
    
    );
    
    return token;
}
 
userSchema.methods.validatePassword= async function(passwordInputBYuser){
    const user =this;
    const passwordHash=user.password
    const isPasswordValid=await bcrypt.compare(passwordInputBYuser,passwordHash);
    return isPasswordValid;
}
module.exports=mongoose.model("User",userSchema);
