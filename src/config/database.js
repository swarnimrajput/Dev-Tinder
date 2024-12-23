const mongoose =require("mongoose");
const { connect } = require("moongose/routes");

const mongoDb=async()=>{
    await mongoose.connect("mongodb+srv://swarnimrajput5826:ZrYBoVnrwNHCXRTr@node-pro1.oyqiz.mongodb.net/devtinder?retryWrites=true&w=majority")
}
module.exports=mongoDb;

