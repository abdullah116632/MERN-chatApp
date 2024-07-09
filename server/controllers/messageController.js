import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";
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
      folder: "chatApp/messages-media",
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

  conversation.deletedBy = [];

  // if (conversation.deletedBy.includes(senderId)) {
  //   conversation.deletedBy = conversation.deletedBy.filter(
  //     (id) => id.toString() !== senderId.toString()
  //   );
  // }

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
  console.log(receiverSocketId);
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

export const removeMessageForOne = asyncErrorHandler(async (req, res, next) => {

  const userId = req.user._id;

    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }

    if (!message.removedBy.includes(userId)) {
      message.removedBy.push(userId);
      await message.save();
    }

    const removedMessage = await Message.findById(req.params.messageId)

  res.status(200).json({
    status: "success",
    data: { message: removedMessage },
  });
});

export const removeMessageForAll = asyncErrorHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.messageId);

  if (!message) {
    return res.status(404).json({ error: 'Message not found' });
  }

  message.removedForEveryone = true;
  await message.save();

  const removedMessage = await Message.findById(req.params.messageId);

  const receiverSocketId = getReciverSockerId(req.params.reciverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("removedMessageForAll", removedMessage);
  }

  res.status(200).json({
    status: "success",
    data: { message: removedMessage },
  });
})

export const unseenMessageCount = asyncErrorHandler(async (req, res, next) => {

  const { userId } = req.params;

  const unseenCount = await Message.countDocuments({
    senderId: userId,
    seenBy: {$nin: [req.user._id]}
  });

  res.status(200).json({
    status: "success",
    data: {
      unseenCount
    }
  })


})

export const markMessageAsSeen = asyncErrorHandler(async (req, res, next) => {
  await Message.updateMany(
    { senderId: req.params.userId, seenBy: {$nin: [req.user._id]} },
    { $addToSet: { seenBy: req.user._id } }
  );

  res.status(200).json({
    status: "success",
    data: null
  })
})
