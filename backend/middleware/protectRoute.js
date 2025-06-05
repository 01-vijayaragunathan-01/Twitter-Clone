import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
const protectRoute = async(req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(400).json({error : "Unauthorized: No token Provided"})
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(!decoded){
            return res.status(400).json({error : "Unauthorized: Invalid Token"})
        }
        const user = await User.findOne({_id : decoded.userId}).select("-password"); //it will not bring password from DB

        if(!user){
            return res.status(400).json({error : "User not found"})
        }
        req.user=user;
        next();
    } catch(error){
        console.log(`error in protectRoute middleware ${error}`);
        res.status(500).json({error : "Internal server error"})
        
    }
}

export default protectRoute;