"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractMessages = exports.fetchConversation = exports.sendMessage = exports.fetchMessages = exports.fetchUsers = void 0;
const messageModel_1 = __importDefault(require("../models/messageModel"));
const messageSchema_1 = require("../schemas/messageSchema");
const conversationModel_1 = __importDefault(require("../models/conversationModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const fetchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userModel_1.default.find({});
        if (!user) {
            return res.status(500).json({
                message: "No users",
            });
        }
        return res.status(200).json({
            totalUsers: user,
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.fetchUsers = fetchUsers;
const fetchMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiverId, senderId } = req.params;
    console.log("ReceiverId:", receiverId);
    console.log("SenderId:", senderId);
    try {
        // Query messages where either the senderId or receiverId matches
        const messages = yield messageModel_1.default.find({
            $or: [
                { senderId: senderId, recieverId: receiverId },
                { senderId: receiverId, recieverId: senderId },
            ],
        });
        // If no messages are found, return 404
        if (!messages || messages.length === 0) {
            return res.status(404).json({
                message: "No messages found",
            });
        }
        // If messages are found, return them
        return res.status(200).json({
            messages,
        });
    }
    catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.fetchMessages = fetchMessages;
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = messageSchema_1.messageSchema.safeParse(req.body);
        const { id: recieverId } = req.params;
        if (!req.user) {
            return res.status(401).json({
                message: "User is not authenticated",
            });
        }
        const senderId = req.user._id;
        if (!message.success) {
            return res.status(400).json({
                message: message.error.issues[0].message,
                //this is backend write socket for this according to the frontend
            });
        }
        let conversation = yield conversationModel_1.default.findOne({
            participants: {
                $all: [senderId, recieverId],
            },
        });
        if (!conversation) {
            conversation = yield conversationModel_1.default.create({
                participants: [senderId, recieverId],
            });
        }
        const newMessage = yield messageModel_1.default.create({
            senderId: senderId,
            recieverId: recieverId,
            message: message.data.message,
        });
        if (!newMessage) {
            return res.status(500).json({
                message: "Something went wrong while creating message",
            });
        }
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        yield Promise.all([conversation.save(), newMessage.save()]);
        return res.status(201).json({
            message: "Message sent successfully",
            MSG: newMessage.message,
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.sendMessage = sendMessage;
const fetchConversation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const conversation = yield conversationModel_1.default.findOne({ participants: id });
        if (!conversation) {
            return res.status(404).json({
                message: "Conversation not found",
            });
        }
        return res.status(200).json({
            conversation,
        });
    }
    catch (e) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.fetchConversation = fetchConversation;
const extractMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { messageId } = req.params;
    try {
        console.log("Received messageId:", messageId); // Log the messageId
        // Query by `_id` or custom `messageId`
        const message = yield messageModel_1.default.findOne({ _id: messageId }); // Adjust field if using a custom field
        // console.log("Message result:", message); // Log the message result
        if (!message) {
            return res.status(404).json({
                message: "Message not found",
            });
        }
        return res.status(200).json({
            message,
        });
    }
    catch (e) {
        console.error("Error fetching message:", e);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.extractMessages = extractMessages;
