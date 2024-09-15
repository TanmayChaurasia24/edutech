import {Router} from "express";
import { fetchMessages, sendMessage } from "../controllers/messageController";
import { authenticate } from "../utils/userAuthenticate";

const router =Router();

router.post("/sendmessage/:id",authenticate, sendMessage);
router.get("/fetchmessages/:senderId/:recieverId",authenticate, fetchMessages);

export default router;