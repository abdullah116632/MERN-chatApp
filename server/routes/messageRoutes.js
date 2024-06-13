import express from "express";
import { sendMessage, getMessage, deleteMessage } from "../controllers/messageController.js";
import protectRoute from "../middleware/protectRoute.js";
import { fileSend } from "../middleware/fileUpload.js";

const router = express.Router();

router.get("/:id", protectRoute, fileSend.single("file-message"), getMessage)
router.post("/send/:id", protectRoute, sendMessage);
router.delete("/:id", protectRoute, deleteMessage)

export default router;