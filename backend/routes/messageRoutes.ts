import express from "express";
import { sendMessage } from "../controllers/messageController";
import { authenticate } from "../utils/userAuthenticate";

const router = express.Router();

router.post("/sendmessage",authenticate, sendMessage);

export default router;