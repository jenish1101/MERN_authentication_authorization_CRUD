const bcrypt = require("bcrypt");
const UserModel = require("../models/User.Model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwt-secret";

const RegisterController = async(req,res)=>{
    const {email,password,role} = req.body;
    console.log(email,password,role);
    
    const user = await UserModel.findOne({email});
    if(user) return res.json({message:"User Already Registered"});

    const hasedPassword = await bcrypt.hash(password,10);

    const UserData = await UserModel.create({email,password:hasedPassword,role});
    return res.json({message:"register", UserData});

};

const LoginController = async(req,res)=>{

    const {email,password} = req.body;
    console.log(email,password);

    const user = await UserModel.findOne({email});
    if(!user) return res.json({message:"User does not exist"});

    const CheckPassword = await bcrypt.compare(password,user.password);
    if(!CheckPassword) return res.json({message:"password does not match"});

    const token = jwt.sign({id:user._id, role:user.role},JWT_SECRET);
    console.log("Token", token);
    
    if(token) return res.json({message:"Login Successfully", token});

}

module.exports = {
    RegisterController,
    LoginController 
}