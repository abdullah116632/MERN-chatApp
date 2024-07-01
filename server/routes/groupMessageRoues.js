import express from "express";
import {createGroupConversation} from "./../controllers/groupMessageController.js"

const router = express.Router();

router.post("/", createGroupConversation)


export default router;