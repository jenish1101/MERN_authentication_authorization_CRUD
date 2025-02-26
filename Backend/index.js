const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');


// Middleware
app.use(cors());
app.use(express.json());


//db
const db = require("./utils/db");
db();


// Models
const UserModle = require("./models/User.Model");


// Routes (Registeration , Login)
const authrouter = require("./routes/authrouters");
app.use("/api/auth",authrouter);


// middleware  (Authorization, Authentication)
const {authVerifyToken, Authorized} = require("./middleware/authVerifyToken");


// Protected Routes For FetchData And All (CRUD)

// Client Api 
app.get('/api/auth/client', authVerifyToken, Authorized(["client"]), async(req,res)=>{
    return res.json({message:"client routes found"})
})

// Visitor Api 
app.get('/api/auth/visitor',authVerifyToken, Authorized(["visitor"]) , async(req,res)=>{
    return res.json({message:"visitor routes found"})
})

// Admin Api 
app.get('/api/auth/admin',authVerifyToken, Authorized(["admin"]) , async(req,res)=>{
    const UserData = await UserModle.find({});
    return res.json({message:"admin routes found", UserData})
})

// For Update Data
app.put("/api/auth/admin/update/:id",async(req,res)=>{

    const {id} = req.params;
    const {email,role}  = req.body;

    console.log(`update ${id} with ${email} and ${role}`);
    
    const UpdateUser = await UserModle.findByIdAndUpdate(
        id,{email,role},{new: true}
    )

    if(!UpdateUser) return res.json({message:"User not found"})

    return res.json({message:"User updated successfully"}); 
 
})

// For Delete Data 
app.delete("/api/auth/admin/delete/:id",async(req,res)=>{
    const {id} = req.params;

    const Delete = await UserModle.findByIdAndDelete(id);
    if(!Delete) return res.json({message:"Delete failed..."});

    return res.json({message:"User Deleted successfully"}); 
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})