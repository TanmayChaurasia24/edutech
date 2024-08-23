"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messageController_1 = require("../controllers/messageController");
const userAuthenticate_1 = require("../utils/userAuthenticate");
const router = (0, express_1.Router)();
router.post("/sendmessage/:id", userAuthenticate_1.authenticate, messageController_1.sendMessage);
exports.default = router;
