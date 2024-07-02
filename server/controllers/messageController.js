import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import { getReciverSockerId, io } from "../socket/socket.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import cloudinary from "../db/cloudinary.js";
import { deleteImageFromServer } from "../utils/deleteFileFromCloud.js";
import customError from "../utils/customErrorClass.js";

export const sendMessage = asyncErrorHandler(async (req, res, next) => {
  let { message } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  if (!receiverId && !senderId) {
    return next(new customError(400, "receiverId and sender Id is missing"));
  }

  if (req.file) {
    const response = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "chatApp",
    });
    await deleteImageFromServer(req.file.path);
    message = response.secure_url;
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, receiverId],
    });
  }

  if (conversation.deletedBy.includes(senderId)) {
    conversation.deletedBy = conversation.deletedBy.filter(
      (id) => id.toString() !== senderId.toString()
    );
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
    isFile: req.file ? true : false,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await Promise.all([conversation.save(), newMessage.save()]);

  const receiverSocketId = getReciverSockerId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json({
    status: "success",
    data: {
      message: newMessage,
    },
  });
});

export const getMessage = asyncErrorHandler(async (req, res, next) => {
  const { id: friendsId } = req.params;
  const senderId = req.user._id;
  const { page = 1, limit = 100 } = req.query;

  if (!friendsId || !senderId) {
    return next(new customError(400, "senderId or friendsId is missing"));
  }

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, friendsId] },
  }).populate({
    path: "messages",
    match: { deletedBy: { $ne: senderId } },
    options: {
      sort: { timestamp: -1 }, // sort messages by timestamp in descending order
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    },
  });

  if (!conversation) {
    return res.status(200).json([]);
  }

  res.status(200).json({
    status: "success",
    data: {
      messages: conversation.messages,
    },
  });
});

export const deleteConversation = asyncErrorHandler(async (req, res, next) => {
  const { id: friendsId } = req.params;
  const senderId = req.user._id;

  if (!friendsId || !senderId) {
    return next(new customError(400, "missing id parameter"));
  }

  const conversation = await Conversation.findOne({
    participants: { $all: [senderId, friendsId] },
  });

  if (!conversation) {
    return res.status(404).json({
      status: "error",
      message: "Conversation not found",
    });
  }

  conversation.deletedBy.push(senderId);
  await conversation.save();

  await Message.updateMany(
    { _id: { $in: conversation.messages } },
    { $addToSet: { deletedBy: senderId } }
  );

  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const removeMessage = asyncErrorHandler(async (req, res, next) => {
  const removedMessage = await Message.findByIdAndUpdate(
    req.params.id,
    { isRemoved: true },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    data: { message: removedMessage },
  });
});

export const deleAllMessage = asyncErrorHandler(async (req, res, next) => {
  await Conversation.deleteMany({});

  res.send("success");
});
