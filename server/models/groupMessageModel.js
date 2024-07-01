import mongoose from "mongoose";

const groupMessage = new mongoose.Schema({
    senderId: {
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

const GroupMessage = mongoose.model("GroupMessage", groupMessage);

export default GroupMessage;