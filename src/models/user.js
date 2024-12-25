const mongoose=require("mongoose");
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
        validate: {
            validator: function (v) {
                // Regex for validating Gmail addresses
                return /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(v);
            },
            message: (props) => `${props.value} is not a valid Gmail address!`
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        min:18,
        max:60,
    },
    Gender:{
        type:String,
        enum:["Male","Female","Others"],
    },
    photoUrl:{
        type:String,
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

module.exports=mongoose.model("User",userSchema);
