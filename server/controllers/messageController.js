import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js"
import User from "../models/userModel.js";
import { getReciverSockerId, io } from "../socket/socket.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";

export const sendMessage = asyncErrorHandler(async (req, res, next) => {

        const {message} = req.body;
        const {id: receiverId} = req.params
        const senderId = req.user._id;

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

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.message.push(newMessage._id)
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

export const getMessage = asyncErrorHandler( async (req, res, next) => {

        const {id: friendsId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, friendsId]},
        }).populate("message");

        if(!conversation){
            return res.status(200).json([]);
        }

        const message = conversation.message

        res.status(200).json({
            status : "success",
            data: {
                messages : message
            }
        });

})

export const deleteMessage = asyncErrorHandler(async (req, res, next) => {

    await Message.findByIdAndUpdate(req.params.id, {isDeleted: true})

    res.status(204).json({
        status: "success",
        data: null
    })
})