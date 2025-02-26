const jwt = require("jsonwebtoken");
const JWT_SECRET = "jwt-secret";

// For Authentication

const authVerifyToken = async (req,res,next)=>{
    const token = req.header("Authorization");
    if(!token) return res.json({message:"Token is required"});

    try {
        const verified = jwt.verify(token.split(" ")[1],JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.json({message:"Token Error",error});
    }
};

// Middleware for Role-Based Access (For Authorization)
const Authorized = (roles) => 
    (req, res, next) => {
    console.log(req.user.role);
    
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access Denied" });
    }

    // if(roles != req.user.role) {
    //     return res.status(403).json({ message: "Access Denied" });
    // }

    next();
};


module.exports = {
    authVerifyToken,
    Authorized
};