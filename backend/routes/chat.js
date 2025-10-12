import express from "express";
import { saveChat , getChatsBetweenUsers } from "../controllers/chatcontroller.js"; // Adjust the path if needed

const router = express.Router();

// Route to save a chat
router.post("/save", saveChat);

// Route to get chats between two users
router.get("/getChats/:senderId/:receiverId", getChatsBetweenUsers);

export default router;
