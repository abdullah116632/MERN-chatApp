import cloudinary from "../db/cloudinary.js";
import User from "../models/userModel.js";
import { deleteImageFromServer, deleteImageFromCloudinary } from "../utils/deleteFileFromCloud.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import CustomError from "./../utils/customErrorClass.js";
import Conversation from "../models/conversationModel.js";

export const getConversations = asyncErrorHandler(
  async (req, res, next) => {
    const loggedInUserId = req.user._id;

    const conversations = await Conversation.find({
      participants: { $in: [loggedInUserId] },
      deletedBy: { $ne: loggedInUserId }
    }).populate({
      path: "participants",
      match: { _id: { $ne: loggedInUserId } },
    }).sort({ updatedAt: -1 });

    const otherParticipants = [];
    conversations.forEach(conversation => {
      otherParticipants.push(conversation.participants[0])
    })

    res.status(200).json({
      status: "success",
      data: {
        conversations: otherParticipants
      },
    });
  }
);

export const searchUser = asyncErrorHandler(async (req, res, next) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  const users = await User.find({
    name: { $regex: query, $options: "i" },
  });

  if (!users) {
    return next(new CustomError(404, "no user match"));
  }

  res.status(200).json({
    status: "success",
    data: {
      users,
    },
  });
});

export const deleteMe = asyncErrorHandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { isActive: false });

  res.cookie("jwt", "", { maxAge: 0 });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateMe = asyncErrorHandler(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(
      new CustomError(
        400,
        "You cannot update your password using this endPoint"
      )
    );
  }

  if (req.file) {
    const user = await User.findOne({_id: req.user.id})
    console.log(req.file.path)
    console.log(user.profilePic)
    await deleteImageFromCloudinary(user.profilePic)

    

    const response = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "chatApp/user-profilePic",
    });
    await deleteImageFromServer(req.file.path);
    req.user.profilePic = response.secure_url;
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name || req.user.name,
      email: req.body.email || req.user.email,
      profilePic: req.user.profilePic,
      gender: req.body.gender || req.user.gender,
    },
    { runValidators: true, new: true }
  );

  console.log(updatedUser)

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});
