import GroupConversation from "../models/groupConversationModel.js";
import GroupMessage from "../models/groupMessageModel.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import cloudinary from "../db/cloudinary.js";
import { deleteImageFromServer } from "../utils/deleteFileFromCloud.js";

export const createGroupConversation = asyncErrorHandler(async (req, res, next) => {

        let {message} = req.body;
        const receiversId = req.query;
        const senderId = req.user._id;

        if(!receiverId && !senderId){
            return next( new customError(400, "receiverId and sender Id is missing"));
        }

        if(req.file){
            const response = await cloudinary.uploader.upload(req.file.path, {resource_type: 'auto', folder: "chatApp"})
            await deleteImageFromServer(req.file.path);
            message = response.secure_url
          }
        

        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, receiverId]},
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })

            const sender = await User.findOne({_id: senderId});
            sender.friends.push(receiverId);
            
            await sender.save({ validateBeforeSave: false });
        }

            const reciver = await User.findOne({_id: receiverId})
            if(!reciver.friends.includes(senderId)){
                reciver.friends.push(senderId);
                reciver.save({validateBeforeSave: false})
            }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
            isFile: req.file ? true : false
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }
        
        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReciverSockerId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json({
            status: "success",
            data: {
                message: newMessage
            }
        })
})