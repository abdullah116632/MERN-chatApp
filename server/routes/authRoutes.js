import express from "express";
import { login, logout, signup, forgetPassword, resetPassword, updatePassword } from "../controllers/authController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/forget-password", forgetPassword)
router.post("/reset-password", resetPassword)
router.patch("/update-password", protectRoute, updatePassword)

export default router;