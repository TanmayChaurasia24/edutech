import {Router} from "express";
import { fetchMessages, sendMessage,fetchConversation, extractMessages } from "../controllers/messageController";
import { authenticate } from "../utils/userAuthenticate";

const router =Router();

router.post("/sendmessage/:id",authenticate, sendMessage);
router.get("/fetchmessages/:senderId/:receiverId",authenticate, fetchMessages);
router.get("/conversation/:id",authenticate, fetchConversation);
router.get("/extractMessages/:messageId",authenticate, extractMessages);


export default router;
