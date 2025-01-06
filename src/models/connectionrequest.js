const mongoose=require("mongoose");
const connectionRequestSchema= new mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type `,
        }
    }
},{
    timestamps:true,
});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    if(connectionRequest.fromuserId.equals(connectionRequest.touserId)){
        throw new Error("Cannot Send Connection Request To yourself");  
    }
    next();
})

const ConnectionRequest = new mongoose.model("ConnectionRequest", connectionRequestSchema);


module.exports = ConnectionRequest;
