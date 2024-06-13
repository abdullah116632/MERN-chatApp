import cloudinary  from "../db/cloudinary.js";
import User from "../models/userModel.js";
import { deleteImageFromServer } from "../utils/deleteFileFromCloud.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "./../utils/customErrorClass.js";

export const getFriendsForSidebar = asyncErrorHandler (async (req, res, next) => {

        const loggedInUserId = req.user._id;

        const loggedInUser = await User.findOne({_id: loggedInUserId}).populate("friends")

        res.status(200).json({
            status: "success",
            data: {
                friends: loggedInUser.friends
            }
        });

})

export const deleteMe = asyncErrorHandler ( async (req, res, next) => {

    await User.findByIdAndUpdate(req.user.id, {isActive: false})

    res.cookie("jwt", "", {maxAge: 0})

    res.status(204).json({
        status: "success",
        data: null
    })
})

export const updateMe = asyncErrorHandler(async (req, res, next) => {

    if(req.body.password || req.body.confirmPassword){
        return next(new CustomError(400, "You cannot update your password using this endPoint"))
    }


    if(req.file){
        const response = await cloudinary.uploader.upload(req.file.path, {resource_type: 'auto', folder: "chatApp"})
        await deleteImageFromServer(req.file.path);
        req.user.profilePic = response.secure_url
      }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
        fullName: req.body.fullName || req.user.fullName,
        email: req.body.email || req.user.email,
        username: req.body.username || req.user.fullname,
        profilePic: req.user.profilePic,
        gender: req.body.gender || req.user.gender,
    }, {runValidators: true, new: true})

    res.status(200).json({
        status: "success",
        data: {
            user : updatedUser
        }
    })
})