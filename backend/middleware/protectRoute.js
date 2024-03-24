import jwt from 'jsonwebtoken';
import User from "../models/user.model.js";

const protectRoute= async(req,res,next)=>{
    try{

        const token = req.cookies.jwt;
        console.log("token from protectRoute --:--",token)
        if(!token){
            return res.status(401).json({error:"Unauthorized - NO token provided"})
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("decoded User --:--",decoded)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invaild token"})
        }

        let user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({error:"Unauthorized - User Not Found..."})
        }

        req.user=user;
        next();

    }
    catch(error){
        console.log("Error in protectRoute...",error.message)
        res.status(500).json({error:"internal server error..."})
    }
};

export default protectRoute;