"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageController_1 = require("../controllers/messageController");
const userAuthenticate_1 = require("../utils/userAuthenticate");
const router = express_1.default.Router();
router.post("/sendmessage", userAuthenticate_1.authenticate, messageController_1.sendMessage);
exports.default = router;
