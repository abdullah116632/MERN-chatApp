import express from "express";
import { sendMessage, getMessage, deleteConversation, removeMessageForOne, removeMessageForAll, unseenMessageCount, markMessageAsSeen, markRealTimeMessageAsSeen } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
import { fileSend } from "../middleware/fileUpload.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", fileSend.single("messageFile"), protectRoute, sendMessage);
router.patch("/remove/:messageId", protectRoute, removeMessageForOne);
router.patch("/remove-forAll/:messageId/:reciverId", protectRoute, removeMessageForAll);
router.delete("/:id", protectRoute, deleteConversation);
router.get("/unseen-count/:senderId", protectRoute, unseenMessageCount)
router.patch("/mark-as-seen/:senderId", protectRoute, markMessageAsSeen)
router.patch("/mark-realTime-message-as-seen/:messageId", protectRoute, markRealTimeMessageAsSeen)


export default router;