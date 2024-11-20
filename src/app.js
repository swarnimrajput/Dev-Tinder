const express= require("express");
const app=express();

//it will work for ac&abc (b is optional)
app.get("/ab?c",(req,res)=>{
    res.send("Hello from the get call");
})
//we can add any no of b in it i.e it will work for abc,abbc,abbbbc....
app.get("/ab+c",(req,res)=>{
    res.send("Hello from the get2 call");
})
//it will should start with ab and end with cd and anything between it will work like absfjsbfbjfcd will work
app.get("/ab*cd",(req,res)=>{
    res.send("Hello from the get3 call");
})
//that means bc is optional , we can wirte ad it will work but if we write acd it wont work
app.get("/a(bc)?d",(req,res)=>{
    res.send("Hello from the get4 call");
})
//anything thatb will end from fly it will work like butterfly,dragonfly...
app.get(/.*fly$/,(req,res)=>{
    res.send("Hello from the get5 call");
})
//we can get query params by doing this 
app.get("/user",(req,res)=>{
    console.log(req.query);
    res.send("Hello from the get5 call");
})
//: means dynamic we are dynamic getting the values of queries i.e 
//http://localhost:3000/user/234/swarnim/12345678 will print Server conected successfully
//{ userId: '234', name: 'swarnim', password: '12345678' } on get request
app.get("/user/:userId/:name/:password",(req,res)=>{
    console.log(req.params);
    res.send("Hello from the get5 call");
})

app.post("/test",(req,res)=>{
    res.send("Hello from the post call");
})

app.delete("/test",(req,res)=>{
    res.send("Deleted");
})

app.patch("/test",(req,res)=>{
    res.send("Patch Call");
})

app.put("/test",(req,res)=>{
    res.send({firstname:"Swarnim",lastname:"Rajput"})
})

app.use("/test",(req,res)=>{
    res.send("Hello From the Server");
})



app.listen(3000,()=>{
    console.log("Server conected successfully");
});