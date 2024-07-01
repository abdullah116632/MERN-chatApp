import mongoose from "mongoose";

const groupCoversationSchema = new mongoose.Schema({
    profilePic: {
        type: String,
        default: ""
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: []
        }
    ]
}, {timestamps: true});

const GroupConversation = mongoose.model("GroupConversation", groupCoversationSchema)

export default GroupConversation;