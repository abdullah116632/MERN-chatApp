import express from "express";
import { sendMessage, getMessage, deleteConversation, deleAllMessage, removeMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
import { fileSend } from "../middleware/fileUpload.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", fileSend.single("message"), protectRoute, sendMessage);
router.patch("/:id", protectRoute, removeMessage);
router.delete("/:id", protectRoute, deleteConversation);



router.delete("/", deleAllMessage);

export default router;