import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js"
import { getReciverSockerId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try{
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
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.message.push(newMessage._id)
        }
        
        // await conversation.save()
        // await newMessage.save()
         // this will run in parallal
        await Promise.all([conversation.save(), newMessage.save()])

        const receiverSocketId = getReciverSockerId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)
    }catch(error){
        res.status(500).json({error})
        console.log(error)
    }
}

export const getMessage = async (req, res) => {
    try{
        
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChatId]},
        }).populate("message");

        if(!conversation){
            return res.status(200).json([]);
        }

        const message = conversation.message

        res.status(200).json(message);

    }catch(error){
        res.status(500).json({error})
    }
}