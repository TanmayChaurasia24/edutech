import {Router} from "express";
import { sendMessage } from "../controllers/messageController";
import { authenticate } from "../utils/userAuthenticate";

const router =Router();

router.post("/sendmessage/:id",authenticate, sendMessage);

export default router;