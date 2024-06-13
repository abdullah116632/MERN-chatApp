import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator"
import generateTokenAndSetToken from "../utils/generateToken.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customErrorClass.js";
import sendMail from "../utils/sendMail.js";

export const signup = asyncErrorHandler( async (req, res, next) => {

        const {fullName, email, username, password, confirmPassword, gender} = req.body;

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            email,
            username,
            password,
            confirmPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

            generateTokenAndSetToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                status: "success",
                data: {
                    user: newUser
                }
            })
})

export const login = asyncErrorHandler( async (req, res, next) => {

        const {username, password, email} = req.body;

        if(!password && (!username || !email)){
            const error = new customError(400, "Please enter password and, username or emal")
            return next(error);
        }

        let user = null;

        if(username){
            user = await User.findOne({username}).select("+password +isActive")
        }else{
            user = await User.findOne({email}).select("+password +isActive")
        }

        if(!user || !user.isActive){
            const error = new customError(404, "This user does not exist")
            return next(error)
        }
        
        const isPasswordCorrect = await bcryptjs.compare(password, user.password || "");

        if(!isPasswordCorrect){
            const error = new customError(401, "Password dont match")
            return next(error)
        }

        generateTokenAndSetToken(user?._id, res);

        res.status(200).json({
            status: "success",
            data: {
                user : {
                    fullName: user.fullName,
                    username: user.username,
                    email: user.email,
                    gender: user.gender,
                    friends: user.friends,
                    profilePic: user.profilePic
                }
            }
        })
})

export const logout = asyncErrorHandler( async (req, res, next) => {
        res.cookie("jwt", "", {maxAge: 0})
        res.status(200).json({
            status: "success",
            data: null
        })
})

export const forgetPassword = asyncErrorHandler ( async (req, res, next) => {
    const {email, username} = req.body;

    if(!email && !username){
        const err = new customError(400, "Please enter email or username")
        return next(err);
    }

    let user
    if(username){
        user = await User.findOne({username})
    }else{
        user = await User.findOne({email});
    }

    if(!user){
        return next(new customError(404, "No user exist with this email or username"))
    }

    const OTP = otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
        });

        user.OTP = OTP;
        user.OTPExpires = Date.now() + 1200000;  //20 minute
        await user.save({ validateBeforeSave: false })

    try{
        await sendMail({
            email: user.email,
            OTP,
            username: user.username
        });

        res.status(200).json({
            status: "success",
            data: {
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                }
            }
        })
    }catch(err){
        next(err)
    }
})

export const resetPassword = asyncErrorHandler (async (req, res, next) => {
    const {email, OTP, newPassword, confirmPassword} = req.body;

    if(!OTP){
        return next(new customError(400, "please send your otp"))
    }
    if(!email || !newPassword || !confirmPassword){
        return next(new customError(400, "anything is missing in emial , password and confirmPassword"))
    }
    if(newPassword !== confirmPassword){
        return next(new customError(400, "password and Confirm password are not same"))
    }

    const user = await User.findOne({
        email,
        isActive: {$ne: false},
        OTP,
        OTPExpires: {$gt: Date.now()}
    })

    if(!user){
        return next(new customError(404, "OTP dont match or has expired or user dont exist"))
    }

    user.password = newPassword;
    user.OTP = undefined;
    user.OTPExpires = undefined;

    await user.save({validateBeforeSave: false});

    const userForResponse = await User.findOne({email})

    res.status(200).json({
        status: "success",
        data: {
            user: userForResponse
        }
    })
})

export const updatePassword = asyncErrorHandler (async (req, res, next) => {

    const {currentPassword, newPassword, confirmPassword} = req.body;

    let user = req.user;

    if(!currentPassword || !newPassword || !confirmPassword){
        return next(new customError(400, "please enter current password new password confirm password all"))
    }

    if(newPassword !== confirmPassword){
        return next(new customError(400, "new password and confirm password must be same"))
    }

    const isPasswordCorrect = await bcryptjs.compare(currentPassword, user.password)

        if(!isPasswordCorrect){
            return next(new customError(401, "Current password dont match"))
        }

        user.password = newPassword;
        await user.save({ validateBeforeSave: false })

        const userForResponse = await User.findOne({email: user.email})

        res.status(200).json({
            status: "success",
            data: {
                user: userForResponse
            }
        })
})