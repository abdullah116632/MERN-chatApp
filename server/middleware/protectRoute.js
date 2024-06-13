import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

const protectRoute = asyncErrorHandler( async (req, res, next) => {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({error: "Unothorized , no token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error: "unothorized , invalid token"});
        }

        const user = await User.findById(decoded.userId).select("+password");

        if(!user){
            return res.status(404).json({error: "User not found"});
        }

        req.user = user;
        next();
})

export default protectRoute;