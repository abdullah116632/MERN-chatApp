import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requird: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requird: true
    },
    message: {
        type: String,
        required: true
    },
    deletedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: [],
            select: false
        }
    ],
    isRemoved: {
        type: Boolean,
        default: false
    },
    isFile: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Message = mongoose.model("Message", messageSchema);

export default Message;