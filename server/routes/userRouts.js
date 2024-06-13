import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getFriendsForSidebar, deleteMe, updateMe } from "../controllers/userController.js";
import { fileSend } from "../middleware/fileUpload.js";

const router = express.Router();

router.get("/", protectRoute, getFriendsForSidebar)
router.delete("/", protectRoute, deleteMe)
router.patch("/", protectRoute, fileSend.single("profilePic"), updateMe)

export default router;