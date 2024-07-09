import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getConversations, deleteMe, updateMe, searchUser, getUserById } from "../controllers/userController.js";
import { fileSend } from "../middleware/fileUpload.js";

const router = express.Router();

router.get("/", protectRoute, getConversations)
router.get("/user/:id", protectRoute, getUserById)
router.get("/search", protectRoute, searchUser)
router.delete("/", protectRoute, deleteMe)
router.patch("/", protectRoute, fileSend.single("profilePic"), updateMe)

export default router;